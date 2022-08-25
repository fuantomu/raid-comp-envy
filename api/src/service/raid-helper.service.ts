import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerClassSpecs,
  WarcraftPlayerSpec
} from "../consts";
import { Team, TeamCharacter, WowAuditDelegate } from "../delegate/wowaudit.delegate";
import { WowAuditClassMap } from "../mapper/wow-audit.mapper";
import { BuildType, PlayerType } from "../model/build.model";
import { PlayerUtil } from "../util/player.util";
import { RaidHelperUtil } from "../util/raid-helper.util";

export class RaidHelper {
  private teams: Team[];

  constructor(callback: Function) {
    (async () => {
      this.teams = await WowAuditDelegate.getTeams();
      callback();
    })();
  }

  private tryToFindCharacter(
    team: Team,
    { discordId, spec, class: className }: PlayerSignup
  ): TeamCharacter | undefined {
    if (team && discordId) {
      const characters = team.players.filter((player) => player.discordId === discordId);
      let queryByClass = characters.find((ch) => WowAuditClassMap[ch.className] === className);
      let classOfSpec = Object.keys(WarcraftPlayerClassSpecs).find((className) =>
        WarcraftPlayerClassSpecs[className as WarcraftPlayerClass].includes(
          spec as WarcraftPlayerSpec
        )
      );
      let queryByClassOfSpec = characters.find(
        (ch) => WowAuditClassMap[ch.className] === classOfSpec
      );
      return queryByClass ?? queryByClassOfSpec;
    }
    return undefined;
  }

  private tryToFindCharacterInAllTeams(
    notInTeam: Team,
    playerSignup: PlayerSignup
  ): TeamCharacter | undefined {
    return this.teams
      .filter((team) => team !== notInTeam)
      .map((team) => this.tryToFindCharacter(team, playerSignup))
      .filter(Boolean)
      .flat()?.[0];
  }

  private filterPlayers(team: Team, players: PlayerSignup[]): PlayerType[] {
    const filteredPlayers: PlayerType[] = [];
    let playerIndex = 0;

    for (const player of players) {
      const { name, class: className, spec, status } = player;
      let character = this.tryToFindCharacter(team, player);

      if (!character) {
        if (team.filter) {
          continue;
        } else {
          character = this.tryToFindCharacterInAllTeams(team, player);
        }
      }

      let fullCharacterName = character?.character ?? name;
      const { name: characterName, realm: characterRealm } =
        PlayerUtil.splitFullName(fullCharacterName);

      let groupId: any = "none";
      if (![InviteStatus.Declined, InviteStatus.Unknown].includes(player.status as InviteStatus)) {
        groupId = Math.floor(playerIndex / 5) + 1;
        groupId = groupId > 8 ? "none" : groupId;
        playerIndex++;
      }

      filteredPlayers.push({
        name: characterName,
        realm: characterRealm,
        class: className,
        spec,
        status,
        group: groupId,
      });
    }

    return filteredPlayers;
  }

  private createRHTeamBuild(players: PlayerSignup[], team: Team, buildTitle?: string): BuildType {
    let name = `${buildTitle ?? "Raid Helper Import"}`;
    if (team) {
      name = name + (team.name ? ` - ${team.name}` : "");
    }
    return {
      buildId: "",
      name,
      players: this.filterPlayers(team, players),
      lastSeen: new Date(),
    };
  }

  public createBuildFromRHByTeams(raw: string): BuildType[] {
    const { name: eventName, players } = RaidHelperUtil.parseRHCSV(raw);
    const all: Team = {
      name: "",
      players: this.teams.map((t) => t.players).flat(),
      filter: false,
    };
    return [all, ...(this.teams.length > 1 ? this.teams : [])]
      .filter((team) => team.players.length > 0)
      .map((team) => this.createRHTeamBuild(players, team, eventName));
  }
}

export interface PlayerSignup extends PlayerType {
  discordId: string;
}
