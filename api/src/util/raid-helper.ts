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

  private static filterTeamPlayers(team: RaidTeam, players: PlayerSignup[]): BuildPlayer[] {
    const filtered: PlayerSignup[] = team ? players.filter((player) => {
      const playerTeam = DiscordWarcraftCharacterTeam[player.discordId];
      return typeof playerTeam === "undefined" || playerTeam === team;
    }) : [...players];
    let index = 0;
    return filtered.map(({ name, class: className, spec, status, group, discordId }) => {
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
          ] ??
          Object.values(account)[0] ??
          name;
      }
      const { name: characterName, realm: characterRealm } = PlayerUtil.splitFullName(
        fullCharacterName
      );
      let groupId: any = "none";
      const playerTeam = DiscordWarcraftCharacterTeam[discordId];
      if (team && playerTeam) {
        groupId = Math.floor(index / 5) + 1;
        groupId = groupId > 8 ? "none" : groupId;
        index++;
      }
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
    let name = `${buildTitle ?? "Raid Helper Import"}`;
    if (team) {
      name = name + ` - ${team.toString()}`;
    }
    return {
      buildId: "",
      name,
      players: RaidHelper.filterTeamPlayers(team, players),
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
      players
    }
  }

  public static createBuildFromRH(raw: string) {
    const {name, players} = RaidHelper.parseRHCSV(raw);
    return RaidHelper.createRHTeamBuild(undefined, players, name);
  }

  public static createBuildFromRHByTeams(
    raw: string
  ): {
    [team in RaidTeam]: BuildType;
  } {
    const {name, players} = RaidHelper.parseRHCSV(raw);
    return {
      [RaidTeam.BF]: RaidHelper.createRHTeamBuild(RaidTeam.BF, players, name),
      [RaidTeam.HC]: RaidHelper.createRHTeamBuild(RaidTeam.HC, players, name),
    };
  }
}

interface PlayerSignup extends BuildPlayer {
  discordId: string;
}
