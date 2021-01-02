import {
  InviteStatus,
  RaidHelperClass,
  RaidHelperSpec,
  RaidHelperStatus,
  WarcraftPlayerClass,
  WarcraftPlayerClassSpecs,
  WarcraftPlayerSpec
} from "../consts";
import { DiscordPlayersMapper, RaidTeam } from "../mappers/discord-player";
import { RHClassMap, RHSpecClassMap, RHSpecMap, RHStatusMap } from "../mappers/raid-helper";
import { DiscordUserCharacter } from "../model/discord-user-character-model";
import { DiscordUserDocument } from "../model/discord-user-model";
import { BuildPlayer, BuildType } from "../types";
import { PlayerUtil } from "./player.util";

export abstract class RaidHelper {
  public static getWarcraftClass(rhClass: string) {
    return RHClassMap[rhClass as RaidHelperClass];
  }

  public static getWarcraftSpec(rhSpec: string) {
    return RHSpecMap[rhSpec as RaidHelperSpec];
  }

  public static getStatus(rhStatus: string) {
    return RHStatusMap[rhStatus as RaidHelperStatus] ?? InviteStatus.Accepted;
  }

  public static getClassFromSpec(rhSpec: string) {
    return RHSpecClassMap[rhSpec];
  }

  public static getClassFromClassOrSpec(rhClassOrSpec: string) {
    return (
      RaidHelper.getWarcraftClass(rhClassOrSpec) ??
      RaidHelper.getClassFromSpec(rhClassOrSpec) ??
      WarcraftPlayerClass.Warrior
    );
  }

  public static parseInvite(line: string): PlayerSignup | void {
    const match = line.match(
      /^(?:(?:(?<status>Tentative|Bench|Absence|Late),(?<classOrSpec>\w+))|(?:(?<className>\w+),(?<spec>\w+))),(?<name>[^,]+),(?<id>\d+),(?<stamp>[\d-:TZ]+)$/
    );
    if (match && match.groups) {
      const { status, classOrSpec, className, spec, name, id } = match.groups;
      return {
        name,
        class:
          RaidHelper.getWarcraftClass(className) ??
          RaidHelper.getClassFromSpec(spec) ??
          RaidHelper.getClassFromClassOrSpec(classOrSpec),
        spec: RaidHelper.getWarcraftSpec(spec) ?? RaidHelper.getWarcraftSpec(classOrSpec),
        status: RaidHelper.getStatus(status),
        discordId: id,
      };
    }
  }

  private static tryToFindCharacter(
    account: DiscordUserDocument,
    spec: string,
    className: string
  ): DiscordUserCharacter | undefined {
    let character: DiscordUserCharacter | undefined;
    if (account) {
      let queryBySpec = account.characters.find((ch) => ch.spec === spec);
      let queryByClass = account.characters.find((ch) => ch.className === className);
      let classOfSpec = Object.keys(WarcraftPlayerClassSpecs).find((className) =>
        WarcraftPlayerClassSpecs[className as WarcraftPlayerClass].includes(
          spec as WarcraftPlayerSpec
        )
      );
      let queryByClassOfSpec = account.characters.find((ch) => ch.className === classOfSpec);
      character = queryBySpec ?? queryByClass ?? queryByClassOfSpec ?? account.characters[0];
    }
    return character;
  }

  private static async filterPlayers(
    team: RaidTeam,
    players: PlayerSignup[]
  ): Promise<BuildPlayer[]> {
    const filteredPlayers: BuildPlayer[] = [];
    let playerIndex = 0;
    for (const player of players) {
      const { name, class: className, spec, status, discordId } = player;
      const account = await DiscordPlayersMapper.getAccount(discordId);
      let character = RaidHelper.tryToFindCharacter(account, spec, className);
      let fullCharacterName = character?.character ?? name;
      const { name: characterName, realm: characterRealm } = PlayerUtil.splitFullName(
        fullCharacterName
      );

      if (team && character?.team && team !== character?.team) {
        continue;
      }

      let groupId: any = "none";
      if (team && character?.team) {
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

  private static async createRHTeamBuild(
    team: RaidTeam,
    players: PlayerSignup[],
    buildTitle?: string
  ): Promise<BuildType> {
    let name = `${buildTitle ?? "Raid Helper Import"}`;
    if (team) {
      name = name + ` - ${team.toString()}`;
    }
    return {
      buildId: "",
      name,
      players: await RaidHelper.filterPlayers(team, players),
    };
  }

  private static parseRHCSV(raw: string) {
    const lines = raw.split("\n");
    const { name: buildTitle } = lines[1].match(/^(?<name>.+?),(?:[\d-]+)/).groups;
    const players = lines
      .slice(4)
      .map(RaidHelper.parseInvite)
      .filter((player) => player !== undefined) as PlayerSignup[];
    return {
      buildId: "",
      name: buildTitle,
      players,
    };
  }

  public static async createBuildFromRH(raw: string) {
    const { name, players } = RaidHelper.parseRHCSV(raw);
    return await RaidHelper.createRHTeamBuild(undefined, players, name);
  }

  public static async createBuildFromRHByTeams(
    raw: string
  ): Promise<
    {
      [team in RaidTeam]: BuildType;
    }
  > {
    const { name, players } = RaidHelper.parseRHCSV(raw);
    return {
      [RaidTeam.BF]: await RaidHelper.createRHTeamBuild(RaidTeam.BF, players, name),
      [RaidTeam.HC]: await RaidHelper.createRHTeamBuild(RaidTeam.HC, players, name),
    };
  }
}

interface PlayerSignup extends BuildPlayer {
  discordId: string;
}
