import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import * as cataclysm from "./cataclysm/consts";
import { WarcraftRole, WarcraftSpecRole } from "./consts";
import * as wotlk from "./wotlk/consts";

const versions = {
  wotlk: wotlk,
  cataclysm: cataclysm
};
export abstract class RoleProvider {
  public static getSpecRole(spec?: WarcraftPlayerSpec): WarcraftRole {
    return spec ? WarcraftSpecRole[spec] : WarcraftRole.Unknown;
  }

  public static getSpecUtilities(spec?: WarcraftPlayerSpec, version?: string) {
    return spec ? versions[version.toLowerCase()].WarcraftSpecUtilities[spec] : [];
  }

  public static getSpecBuffs(spec?: WarcraftPlayerSpec, version?: string) {
    return spec ? versions[version.toLowerCase()].WarcraftSpecRaidBuffs[spec] : [];
  }

  public static getClassBuff(class_name?: WarcraftPlayerClass, version?: string) {
    return class_name ? versions[version.toLowerCase()].WarcraftClassRaidBuffs[class_name] : [];
  }

  public static getSpecDebuffs(spec?: WarcraftPlayerSpec, version?: string) {
    return spec ? versions[version.toLowerCase()].WarcraftSpecRaidDebuffs[spec] : [];
  }

  public static getClassDebuff(class_name?: WarcraftPlayerClass, version?: string) {
    return class_name ? versions[version.toLowerCase()].WarcraftClassRaidDebuffs[class_name] : [];
  }

  public static getClassUtilities(class_name?: WarcraftPlayerClass, version?: string) {
    return class_name ? versions[version.toLowerCase()].WarcraftClassUtilities[class_name] : [];
  }

  public static getRaceUtilities(raceName?: WarcraftPlayerRace, version?: string) {
    return raceName ? versions[version.toLowerCase()].WarcraftRaceUtilities[raceName] : [];
  }

  public static getVersionBuffs(version?: string) {
    return versions[version.toLowerCase()].WarcraftRaidBuff;
  }

  public static getVersionDebuffs(version?: string) {
    return versions[version.toLowerCase()].WarcraftRaidDebuff;
  }

  public static getVersionRaidUtility(version?: string) {
    return versions[version.toLowerCase()].WarcraftRaidUtility;
  }
}
