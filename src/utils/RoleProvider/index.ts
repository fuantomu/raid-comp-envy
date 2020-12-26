import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import {
  WarcraftClassUtilities,
  WarcraftRaidBuff,
  WarcraftRaidUtility,
  WarcraftRole,
  WarcraftSpecRaidBuffs,
  WarcraftSpecRole,
  WarcraftSpecUtilities,
} from "./consts";

export abstract class RoleProvider {
  public static getSpecRole(spec?: WarcraftPlayerSpec): WarcraftRole {
    return spec ? WarcraftSpecRole[spec] : WarcraftRole.Unknown;
  }

  public static getSpecUtilities(spec?: WarcraftPlayerSpec): WarcraftRaidUtility[] {
    return spec ? WarcraftSpecUtilities[spec] : [];
  }

  public static getSpecBuffs(className?: WarcraftPlayerSpec): WarcraftRaidBuff[] {
    return className ? WarcraftSpecRaidBuffs[className] : [];
  }

  public static getClassUtilities(className?: WarcraftPlayerClass): WarcraftRaidUtility[] {
    return className ? WarcraftClassUtilities[className] : [];
  }
}
