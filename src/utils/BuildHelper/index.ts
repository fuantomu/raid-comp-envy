import { BuildGroup, BuildGroups, BuildPlayer, BuildRoles, GroupId } from "../../types";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";

export abstract class BuildHelper {
  public static getGroups(players: BuildPlayer[]): BuildGroups {
    const ungrouped: BuildGroup = {
      groupId: "none",
      players: [],
    };
    const groups: BuildGroups = {
      none: ungrouped,
    };
    for (const player of players) {
      let groupId: GroupId = player.group ?? "none";
      groupId = groupId > 8 ? "none" : groupId;
      const group = groups[groupId];
      if (!group) {
        groups[groupId] = {
          groupId,
          players: [player],
        };
      } else {
        group.players.push(player);
      }
    }
    return groups;
  }

  public static getRoles(players: BuildPlayer[]): BuildRoles {
    const buildRoles: BuildRoles = {
      [WarcraftRole.Unknown]: [],
      [WarcraftRole.Tank]: [],
      [WarcraftRole.Healer]: [],
      [WarcraftRole.RangedDPS]: [],
      [WarcraftRole.MeleeDPS]: [],
    };

    for (const player of players) {
      buildRoles[RoleProvider.getSpecRole(player.spec)].push(player);
    }

    return buildRoles;
  }
}
