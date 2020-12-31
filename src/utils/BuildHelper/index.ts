import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
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

  public static parseImport(importString: string): BuildPlayer[] {
    const lines = importString.split("\n");
    const players: BuildPlayer[] = [];

    for (const line of lines) {
      let [name, className, spec, status] = line.split(",");
      if (!name || !className) {
        continue;
      }
      if (!(className in WarcraftPlayerClass)) {
        continue;
      }
      if (spec && !(spec in WarcraftPlayerSpec)) {
        spec = "";
      }
      if (status && !(status in InviteStatus)) {
        status = InviteStatus.Unknown;
      }
      players.push({
        ...PlayerUtils.splitFullName(name),
        class: className as WarcraftPlayerClass,
        status: status as InviteStatus,
        spec: spec as WarcraftPlayerSpec
      })
    }

    return players;
  }
}
