import {
  InviteStatus,
  RaidHelperClass,
  RaidHelperSpec,
  RaidHelperStatus,
  WarcraftPlayerClass,
  WarcraftPlayerClassSpecs,
  WarcraftPlayerSpec
} from "../consts";
import {
  DiscordWarcraftCharacter,
  DiscordWarcraftCharacterTeam,
  RaidTeam
} from "../mappers/discord-player";
import { RHClassMap, RHSpecClassMap, RHSpecMap, RHStatusMap } from "../mappers/raid-helper";
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

  public static parseInvite(line: string): PlayerSignup | void {
    const match = line.match(
      /^(?:(?<status>Tentative)|(?<className>\w+)),(?<spec>\w+),(?<name>[^,]+),(?<id>\d+),(?<stamp>[\d-:TZ]+)$/
    );
    if (match && match.groups) {
      const { status, className, spec, name, id } = match.groups;
      return {
        name,
        class:
          RaidHelper.getWarcraftClass(className) ??
          RaidHelper.getClassFromSpec(spec) ??
          WarcraftPlayerClass.Warrior,
        spec: RaidHelper.getWarcraftSpec(spec),
        status: RaidHelper.getStatus(status),
        discordId: id,
      };
    }
  }

  private static filterTeamPlayers(team: RaidTeam, players: PlayerSignup[]): BuildPlayer[] {
    const filtered: PlayerSignup[] = players.filter((player) => {
      const playerTeam = DiscordWarcraftCharacterTeam[player.discordId];
      return typeof playerTeam === "undefined" || playerTeam === team;
    });
    return filtered.map(({ name, class: className, spec, status, group, discordId }, index) => {
      const playerTeam = DiscordWarcraftCharacterTeam[discordId];
      let fullCharacterName = name;
      const account = DiscordWarcraftCharacter[discordId];
      if (account) {
        let queryBySpec = spec ? account[spec as WarcraftPlayerSpec] : undefined;
        let queryByClass = className ? account[className as WarcraftPlayerClass] : undefined;
        let classOfSpec = spec
          ? Object.keys(WarcraftPlayerClassSpecs).find((className) =>
              WarcraftPlayerClassSpecs[className as WarcraftPlayerClass].includes(
                spec as WarcraftPlayerSpec
              )
            )
          : undefined;
        let queryByClassOfSpec = classOfSpec
          ? account[classOfSpec as WarcraftPlayerClass]
          : undefined;
        fullCharacterName =
          account[
            (queryBySpec ?? queryByClass ?? queryByClassOfSpec) as
              | WarcraftPlayerSpec
              | WarcraftPlayerClass
          ] ?? Object.values(account)[0] ?? name;
      }
      const { name: characterName, realm: characterRealm } = PlayerUtil.splitFullName(
        fullCharacterName
      );
      const indexGroup = playerTeam ? (index % 5) + 1 : 0;
      const groupId = indexGroup > 8 ? 0 : indexGroup;
      return {
        name: characterName,
        realm: characterRealm,
        class: className,
        spec,
        status,
        group: groupId,
      };
    });
  }

  private static createRHTeamBuild(
    team: RaidTeam,
    players: PlayerSignup[],
    buildTitle?: string
  ): BuildType {
    return {
      buildId: "",
      name: `${buildTitle ?? "Raid Helper Import"} - ${team.toString()}`,
      players: RaidHelper.filterTeamPlayers(team, players),
    };
  }

  public static createBuildsFromRH(
    raw: string
  ): {
    [team in RaidTeam]: BuildType;
  } {
    const lines = raw.split("\n");
    const { name: buildTitle } = lines[1].match(/^(?<name>.+?),(?:[\d-]+)/).groups;
    const players = lines
      .slice(4)
      .map(RaidHelper.parseInvite)
      .filter((player) => player !== undefined) as PlayerSignup[];
    return {
      [RaidTeam.BF]: RaidHelper.createRHTeamBuild(RaidTeam.BF, players, buildTitle),
      [RaidTeam.HC]: RaidHelper.createRHTeamBuild(RaidTeam.HC, players, buildTitle),
    };
  }
}

interface PlayerSignup extends BuildPlayer {
  discordId: string;
}
