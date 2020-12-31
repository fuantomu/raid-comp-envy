import { Build, BuildGroups, BuildPlayer, BuildRoles, GroupId } from "../../types";
import { PlayerUtils } from "../PlayerUtils";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";

export abstract class BuildHelper {
  public static getGroups(players: BuildPlayer[], getEmpty: boolean = false): BuildGroups {
    const emptyGroups = getEmpty ? BuildHelper.getEmptyGroups() : {};
    const groups: BuildGroups = {
      ...emptyGroups,
      none: {
        groupId: "none",
        players: [],
      },
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

  private static getEmptyGroups() {
    const groups: any = {};
    for (let groupId = 1; groupId <= 8; groupId++) {
      groups[groupId] = { groupId , players: [] };
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

  public static generateExport(build: Build): string {
    return build.players.map(player => {
      return `${PlayerUtils.getFullName(player)},${player.class},${player.spec ?? ""},${player.status}`;
    }).join("\n");
  }
}
