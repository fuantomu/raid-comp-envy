import { BuildGroup, BuildPlayer, BuildRoles } from "../../types";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";

export abstract class BuildHelper {
  public static getGroups(players: BuildPlayer[]): BuildGroup[] {
    const ungrouped: BuildGroup = {
      groupId: 0,
      players: [],
    };
    const groups: BuildGroup[] = [ungrouped];
    for (const player of players) {
      let groupId = player.group ?? 0;
      groupId = groupId > 8 ? 0 : groupId;
      const group = groups.find((group) => group.groupId === groupId);
      if (!group) {
        groups.push({
          groupId,
          players: [player],
        });
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
