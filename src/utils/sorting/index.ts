import { ClassWeight, RoleWeight } from "../../consts";
import { BuildPlayer } from "../../types";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";

export const sortFunctions = {
  NAME: function (a: BuildPlayer, b: BuildPlayer) {
    return a.name.localeCompare(b.name);
  },
  ROLETANK: function (a: BuildPlayer) {
    return RoleProvider.getSpecRole(a.spec) === WarcraftRole.Tank ? -1 : 1;
  },
  ROLEMELEE: function (a: BuildPlayer) {
    return RoleProvider.getSpecRole(a.spec) === WarcraftRole.MeleeDPS ? -1 : 1;
  },
  ROLERANGED: function (a: BuildPlayer) {
    return RoleProvider.getSpecRole(a.spec) === WarcraftRole.RangedDPS ? -1 : 1;
  },
  ROLEHEALER: function (a: BuildPlayer) {
    return RoleProvider.getSpecRole(a.spec) === WarcraftRole.Healer ? -1 : 1;
  },
  DEFAULT: function (a: BuildPlayer, b: BuildPlayer) {
    return (
      RoleWeight[RoleProvider.getSpecRole(a.spec)] - RoleWeight[RoleProvider.getSpecRole(b.spec)] ||
      ClassWeight[a.class_name] - ClassWeight[b.class_name] ||
      a.name.localeCompare(b.name)
    );
  }
};
