import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import {
  WarcraftClassRaidBuffs,
  WarcraftClassRaidBuffsWotlk,
  WarcraftClassRaidDebuffs,
  WarcraftClassRaidDebuffsWotlk,
  WarcraftClassUtilities,
  WarcraftClassUtilitiesWotlk,
  WarcraftRaceUtilities,
  WarcraftRaceUtilitiesWotlk,
  WarcraftRaidBuff,
  WarcraftRaidBuffCataclysm,
  WarcraftRaidBuffWotlk,
  WarcraftRaidDebuff,
  WarcraftRaidDebuffCataclysm,
  WarcraftRaidDebuffWotlk,
  WarcraftRaidUtility,
  WarcraftRaidUtilityCataclysm,
  WarcraftRaidUtilityWotlk,
  WarcraftRole,
  WarcraftSpecRaidBuffs,
  WarcraftSpecRaidBuffsWotlk,
  WarcraftSpecRaidDebuffs,
  WarcraftSpecRaidDebuffsWotlk,
  WarcraftSpecRole,
  WarcraftSpecUtilities,
  WarcraftSpecUtilitiesWotlk
} from "./consts";

export abstract class RoleProvider {
  public static getSpecRole(spec?: WarcraftPlayerSpec): WarcraftRole {
    return spec ? WarcraftSpecRole[spec] : WarcraftRole.Unknown;
  }

  public static getSpecUtilities(spec?: WarcraftPlayerSpec, version?: string): WarcraftRaidUtility[] {
    if(version?.toLowerCase() === 'wotlk'){
      return spec ? WarcraftSpecUtilitiesWotlk[spec] : [];
    }
    return spec ? WarcraftSpecUtilities[spec] : [];
  }

  public static getSpecBuffs(spec?: WarcraftPlayerSpec, version?: string): WarcraftRaidBuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return spec ? WarcraftSpecRaidBuffsWotlk[spec] : [];
    }
    return spec ? WarcraftSpecRaidBuffs[spec] : [];
  }

  public static getClassBuff(className?: WarcraftPlayerClass, version?: string): WarcraftRaidBuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return className ? WarcraftClassRaidBuffsWotlk[className] : [];
    }
    return className ? WarcraftClassRaidBuffs[className] : [];
  }

  public static getSpecDebuffs(spec?: WarcraftPlayerSpec, version?: string): WarcraftRaidDebuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return spec ? WarcraftSpecRaidDebuffsWotlk[spec] : [];
    }
    return spec ? WarcraftSpecRaidDebuffs[spec] : [];
  }

  public static getClassDebuff(className?: WarcraftPlayerClass, version?: string): WarcraftRaidDebuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return className ? WarcraftClassRaidDebuffsWotlk[className] : [];
    }
    return className ? WarcraftClassRaidDebuffs[className] : [];
  }

  public static getClassUtilities(className?: WarcraftPlayerClass, version?: string): WarcraftRaidUtility[] {
    if(version?.toLowerCase() === 'wotlk'){
      return className ? WarcraftClassUtilitiesWotlk[className] : [];
    }
    return className ? WarcraftClassUtilities[className] : [];
  }

  public static getRaceUtilities(raceName?: WarcraftPlayerRace, version?: string): WarcraftRaidUtility[] {
    if(version?.toLowerCase() === 'wotlk'){
      return raceName ? WarcraftRaceUtilitiesWotlk[raceName] : [];
    }
    return raceName ? WarcraftRaceUtilities[raceName] : [];
  }

  public static getVersionBuffs(version?: string) {
    switch (version?.toLowerCase()) {
      case "wotlk":
        return WarcraftRaidBuffWotlk;
      case "cataclysm":
        return WarcraftRaidBuffCataclysm;
      default:
        return WarcraftRaidBuff;
    }
  }

  public static getVersionDebuffs(version?: string) {
    switch (version?.toLowerCase()) {
      case "wotlk":
        return WarcraftRaidDebuffWotlk;
      case "cataclysm":
        return WarcraftRaidDebuffCataclysm;
      default:
        return WarcraftRaidDebuff;
    }
  }

  public static getVersionRaidUtility(version?: string) {
    switch (version?.toLowerCase()) {
      case "wotlk":
        return WarcraftRaidUtilityWotlk;
      case "cataclysm":
        return WarcraftRaidUtilityCataclysm;
      default:
        return WarcraftRaidUtility;
    }
  }
}
