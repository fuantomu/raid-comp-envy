import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRaidBuff, WarcraftRaidDebuff, WarcraftRaidUtility, WarcraftRole } from "../RoleProvider/consts";
import {
  CustomIcon,
  IconUnknown,
  WarcraftBuffIcon,
  WarcraftClassIcon,
  WarcraftDebuffIcon,
  WarcraftIconSize,
  WarcraftRaceIcon,
  WarcraftRoleIcon,
  WarcraftSpecIcon,
  WarcraftUtilityIcon
} from "./consts";

export abstract class IconProvider {
  private static readonly WARCRAFT_ICONS_PATH = "https://render-eu.worldofwarcraft.com/icons";

  private static getWarcraftIconURI(
    iconName?: string,
    size: WarcraftIconSize = WarcraftIconSize.MEDIUM
  ) {
    return `${IconProvider.WARCRAFT_ICONS_PATH}/${size}/${iconName ?? IconUnknown}.jpg`;
  }

  public static getSpecIcon(spec?: WarcraftPlayerSpec): string;
  public static getSpecIcon(spec: WarcraftPlayerSpec, size?: WarcraftIconSize): string;
  public static getSpecIcon(spec?: WarcraftPlayerSpec, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(spec && WarcraftSpecIcon[spec], size);
  }

  public static getClassIcon(className?: WarcraftPlayerClass): string;
  public static getClassIcon(className: WarcraftPlayerClass, size?: WarcraftIconSize): string;
  public static getClassIcon(className?: WarcraftPlayerClass, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(className && WarcraftClassIcon[className], size);
  }

  public static getRaceIcon(raceName?: WarcraftPlayerRace): string;
  public static getRaceIcon(raceName: WarcraftPlayerRace, size?: WarcraftIconSize): string;
  public static getRaceIcon(raceName?: WarcraftPlayerRace, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(raceName && WarcraftRaceIcon[raceName], size);
  }

  public static getSpecRoleIcon(spec?: WarcraftPlayerSpec): string;
  public static getSpecRoleIcon(spec: WarcraftPlayerSpec, size?: WarcraftIconSize): string;
  public static getSpecRoleIcon(spec?: WarcraftPlayerSpec, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(WarcraftRoleIcon[RoleProvider.getSpecRole(spec)], size);
  }

  public static getRoleIcon(role?: WarcraftRole): string;
  public static getRoleIcon(role: WarcraftRole, size?: WarcraftIconSize): string;
  public static getRoleIcon(role?: WarcraftRole, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(role && WarcraftRoleIcon[role], size);
  }

  public static getBuffIcon(buff?: WarcraftRaidBuff): string;
  public static getBuffIcon(buff: WarcraftRaidBuff, size?: WarcraftIconSize): string;
  public static getBuffIcon(buff?: WarcraftRaidBuff, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(buff && WarcraftBuffIcon[buff], size);
  }

  public static getDebuffIcon(debuff?: WarcraftRaidDebuff): string;
  public static getDebuffIcon(debuff: WarcraftRaidDebuff, size?: WarcraftIconSize): string;
  public static getDebuffIcon(debuff?: WarcraftRaidDebuff, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(debuff && WarcraftDebuffIcon[debuff], size);
  }

  public static getUtilityIcon(utility?: WarcraftRaidUtility): string;
  public static getUtilityIcon(utility: WarcraftRaidUtility, size?: WarcraftIconSize): string;
  public static getUtilityIcon(utility?: WarcraftRaidUtility, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(utility && WarcraftUtilityIcon[utility], size);
  }

  public static getCustomIcon(customIcon?: CustomIcon): string;
  public static getCustomIcon(customIcon: CustomIcon, size?: WarcraftIconSize): string;
  public static getCustomIcon(customIcon?: CustomIcon, size?: WarcraftIconSize): string {
    return IconProvider.getWarcraftIconURI(customIcon, size);
  }
}
