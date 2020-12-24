import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import { WarcraftClassIcon, WarcraftIconSize, WarcraftSpecIcon } from "./consts";

export abstract class IconProvider {
  private static readonly WARCRAFT_ICONS_PATH = "https://render-eu.worldofwarcraft.com/icons";

  private static getWarcraftIconURI(
    iconName: string,
    size: WarcraftIconSize = WarcraftIconSize.MEDIUM
  ) {
    return `${IconProvider.WARCRAFT_ICONS_PATH}/${size}/${iconName}.jpg`;
  }

  public static getWarcraftIcon(playerClass: WarcraftPlayerClass): string;
  public static getWarcraftIcon(playerSpec: WarcraftPlayerSpec): string;
  public static getWarcraftIcon(playerClass: WarcraftPlayerClass, size: WarcraftIconSize): string;
  public static getWarcraftIcon(playerSpec: WarcraftPlayerSpec, size: WarcraftIconSize): string;
  public static getWarcraftIcon(
    reference: WarcraftPlayerClass | WarcraftPlayerSpec,
    size?: WarcraftIconSize
  ): string {
    const icon =
      reference in WarcraftPlayerClass
        ? WarcraftClassIcon[reference as WarcraftPlayerClass]
        : WarcraftSpecIcon[reference as WarcraftPlayerSpec];
    return IconProvider.getWarcraftIconURI(icon, size);
  }
}
