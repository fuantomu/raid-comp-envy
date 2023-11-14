import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import {
  WarcraftClassRaidBuffs,
  WarcraftClassRaidDebuffs,
  WarcraftClassUtilities,
  WarcraftRaidBuff,
  WarcraftRaidDebuff,
  WarcraftRaidUtility,
  WarcraftRole,
  WarcraftSpecRaidBuffs,
  WarcraftSpecRaidDebuffs,
  WarcraftSpecRole,
  WarcraftSpecUtilities
} from "./consts";

export abstract class RoleProvider {
  public static getSpecRole(spec?: WarcraftPlayerSpec): WarcraftRole {
    return spec ? WarcraftSpecRole[spec] : WarcraftRole.Unknown;
  }

  public static getSpecUtilities(spec?: WarcraftPlayerSpec): WarcraftRaidUtility[] {
    return spec ? WarcraftSpecUtilities[spec] : [];
  }

  public static getSpecBuffs(spec?: WarcraftPlayerSpec): WarcraftRaidBuff[] {
    return spec ? WarcraftSpecRaidBuffs[spec] : [];
  }

  public static getClassBuff(className?: WarcraftPlayerClass): WarcraftRaidBuff[] {
    return className ? WarcraftClassRaidBuffs[className] : [];
  }

  public static getSpecDebuffs(spec?: WarcraftPlayerSpec): WarcraftRaidDebuff[] {
    return spec ? WarcraftSpecRaidDebuffs[spec] : [];
  }

  public static getClassDebuff(className?: WarcraftPlayerClass): WarcraftRaidDebuff[] {
    return className ? WarcraftClassRaidDebuffs[className] : [];
  }

  public static getClassUtilities(className?: WarcraftPlayerClass): WarcraftRaidUtility[] {
    return className ? WarcraftClassUtilities[className] : [];
  }
}
