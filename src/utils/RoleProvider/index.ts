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

  public static getClassBuff(class_name?: WarcraftPlayerClass, version?: string): WarcraftRaidBuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return class_name ? WarcraftClassRaidBuffsWotlk[class_name] : [];
    }
    return class_name ? WarcraftClassRaidBuffs[class_name] : [];
  }

  public static getSpecDebuffs(spec?: WarcraftPlayerSpec, version?: string): WarcraftRaidDebuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return spec ? WarcraftSpecRaidDebuffsWotlk[spec] : [];
    }
    return spec ? WarcraftSpecRaidDebuffs[spec] : [];
  }

  public static getClassDebuff(class_name?: WarcraftPlayerClass, version?: string): WarcraftRaidDebuff[] {
    if(version?.toLowerCase() === 'wotlk'){
      return class_name ? WarcraftClassRaidDebuffsWotlk[class_name] : [];
    }
    return class_name ? WarcraftClassRaidDebuffs[class_name] : [];
  }

  public static getClassUtilities(class_name?: WarcraftPlayerClass, version?: string): WarcraftRaidUtility[] {
    if(version?.toLowerCase() === 'wotlk'){
      return class_name ? WarcraftClassUtilitiesWotlk[class_name] : [];
    }
    return class_name ? WarcraftClassUtilities[class_name] : [];
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
