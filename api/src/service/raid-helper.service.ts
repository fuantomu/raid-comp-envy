import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerClassSpecs,
  WarcraftPlayerSpec
} from "../consts";
import { Team, TeamCharacter, WowAuditDelegate } from "../delegate/wowaudit.delegate";
import { BuildType, PlayerType } from "../model/build.model";
import { DiscordId } from "../types";
import { PlayerUtil } from "../util/player.util";
import { RaidHelperUtil } from "../util/raid-helper.util";

export abstract class RaidHelper {
  private static tryToFindCharacter(
    team: Team,
    discordId: DiscordId,
    spec: string,
    className: string
  ): TeamCharacter | undefined {
    let character: TeamCharacter | undefined;
    if (team && discordId) {
      const characters = team.players.filter((player) => player.discordId === discordId);
      let queryBySpec = characters.find((ch) => ch.spec === spec);
      let queryByClass = characters.find((ch) => ch.className === className);
      let classOfSpec = Object.keys(WarcraftPlayerClassSpecs).find((className) =>
        WarcraftPlayerClassSpecs[className as WarcraftPlayerClass].includes(
          spec as WarcraftPlayerSpec
        )
      );
      let queryByClassOfSpec = characters.find((ch) => ch.className === classOfSpec);
      character = queryBySpec ?? queryByClass ?? queryByClassOfSpec ?? characters[0];
    }
    return character;
  }

  private static filterPlayers(team: Team, players: PlayerSignup[]): PlayerType[] {
    const filteredPlayers: PlayerType[] = [];
    let playerIndex = 0;

    for (const player of players) {
      const { name, class: className, spec, status, discordId } = player;
      let character = RaidHelper.tryToFindCharacter(team, discordId, spec, className);
      let fullCharacterName = character?.character ?? name;
      const { name: characterName, realm: characterRealm } =
        PlayerUtil.splitFullName(fullCharacterName);

      if (team.filter && !character) {
        continue;
      }

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

  private static createRHTeamBuild(
    players: PlayerSignup[],
    team: Team,
    buildTitle?: string
  ): BuildType {
    let name = `${buildTitle ?? "Raid Helper Import"}`;
    if (team) {
      name = name + ` - ${team.name}`;
    }
    return {
      buildId: "",
      name,
      players: RaidHelper.filterPlayers(team, players),
    };
  }

  public static async createBuildFromRHByTeams(raw: string): Promise<BuildType[]> {
    const { name: eventName, players } = RaidHelperUtil.parseRHCSV(raw);
    const teams = await WowAuditDelegate.getTeams();
    const all: Team = { name: "All", players: teams.map((t) => t.players).flat(), filter: false };
    return [all, ...teams]
      .filter((team) => team.players.length > 0)
      .map((team) => RaidHelper.createRHTeamBuild(players, team, eventName));
  }
}

export interface PlayerSignup extends PlayerType {
  discordId: string;
}
