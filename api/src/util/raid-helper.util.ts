import {
  InviteStatus,
  RaidHelperClass,
  RaidHelperSpec,
  RaidHelperStatus,
  WarcraftPlayerClass
} from "../consts";
import { RHClassMap, RHSpecClassMap, RHSpecMap, RHStatusMap } from "../mapper/raid-helper.mapper";
import { PlayerSignup } from "../service/raid-helper.service";

export abstract class RaidHelperUtil {
  public static parseRHCSV(raw: string) {
    const lines = raw.split("\n");
    const { name: buildTitle } = lines[1].match(/^(?<name>.+?),(?:[\d-]+)/).groups;
    const players = lines
      .slice(4)
      .map(RaidHelperUtil.parseInvite)
      .filter((player) => player !== undefined) as PlayerSignup[];
    return {
      buildId: "",
      name: buildTitle,
      players,
    };
  }

  private static parseInvite(line: string): PlayerSignup | void {
    const match = line.match(
      /^(?:(?:(?<status>Tentative|Bench|Absence|Late),(?<classOrSpec>\w+))|(?:(?<className>\w+),(?<spec>\w+))),(?<name>[^,]+),(?<id>\d+),(?<stamp>[\d-:TZ]+)/
    );
    if (match && match.groups) {
      const { status, classOrSpec, className, spec, name, id } = match.groups;
      return {
        name,
        class:
          RaidHelperUtil.getWarcraftClass(className) ??
          RaidHelperUtil.getClassFromSpec(spec) ??
          RaidHelperUtil.getClassFromClassOrSpec(classOrSpec),
        spec: RaidHelperUtil.getWarcraftSpec(spec) ?? RaidHelperUtil.getWarcraftSpec(classOrSpec),
        status: RaidHelperUtil.getStatus(status),
        discordId: id,
      };
    }
  }

  private static getWarcraftClass(rhClass: string) {
    return RHClassMap[rhClass as RaidHelperClass];
  }

  private static getWarcraftSpec(rhSpec: string) {
    return RHSpecMap[rhSpec as RaidHelperSpec];
  }

  private static getStatus(rhStatus: string) {
    return RHStatusMap[rhStatus as RaidHelperStatus] ?? InviteStatus.Accepted;
  }

  private static getClassFromSpec(rhSpec: string) {
    return RHSpecClassMap[rhSpec as RaidHelperSpec];
  }

  private static getClassFromClassOrSpec(rhClassOrSpec: string) {
    return (
      RaidHelperUtil.getWarcraftClass(rhClassOrSpec) ??
      RaidHelperUtil.getClassFromSpec(rhClassOrSpec) ??
      WarcraftPlayerClass.Unknown
    );
  }
}
