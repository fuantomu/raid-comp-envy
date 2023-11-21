import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import { Build, BuildGroups, BuildPlayer, BuildRoles, ConnectionString, GroupId } from "../../types";
import { RosterProvider } from "../../utils/RosterProvider";
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
      groupId = groupId > 5 ? "none" : groupId;
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
    for (let groupId = 1; groupId <= 5; groupId++) {
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
      if (status && !Object.values(InviteStatus).includes(status as InviteStatus)) {
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

  private static fixTankClasses(className: string, spec: string): string{
    switch(spec){
      case "Protection": {
        return "Warrior";
      }
      case "Protection1": {
        return "Paladin"
      }
      default:
        return className
    }
  }

  public static async parseRaidHelper(id: string) {
    const players: BuildPlayer[] = [];
    const statusIgnore = ['Absence', 'Tentative', 'Late']
    await RosterProvider.getRosterRaidPlayers(id).then((roster) => {
      try {
        for (const player of roster) {
          if ((statusIgnore.includes(player.spec)) || (statusIgnore.includes(player.class))){
            continue
          }

          const spec = player.spec.split("_")[0].replace("1","")
          const pclass = BuildHelper.fixTankClasses(player.class, player.spec).replace("DK","DeathKnight")

          players.push({
            name: player.name,
            class: pclass as WarcraftPlayerClass,
            spec: (pclass + spec) as WarcraftPlayerSpec,
            status: InviteStatus.Unknown,
            group: "roster",
            realm: undefined,
            oldName: player.name
        })}
      } catch (error) {
        players.push({
          name: "ErrorInvalidID",
          class: WarcraftPlayerClass.DeathKnight,
          spec: WarcraftPlayerSpec.DeathKnightBlood,
          status: InviteStatus.Invited,
          group: "roster"
      })
      }


    });
    return players;
  }

  public static async parseSqlImport(connectionString: ConnectionString) {
    const players: BuildPlayer[] = [];
    connectionString.table = process.env.REACT_APP_SQL_TABLE

    await RosterProvider.getRosterRaidPlayersSql(JSON.stringify(connectionString)).then((roster) =>{
      try {
        for (const player of roster) {
          //const spec = player.spec.split("_")[0].replace("1","")
          //const pclass = BuildHelper.fixTankClasses(player.class, player.spec).replace("DK","DeathKnight")

          players.push({
            name: player.name,
            class: player.class as WarcraftPlayerClass,
            spec: player.spec as WarcraftPlayerSpec,
            status: InviteStatus.Invited,
            group: "roster",
            realm: undefined,
            oldName: player.name
        })}
      } catch (error) {
        //console.log(error)
        players.push({
          name: "ErrorInvalidID",
          class: WarcraftPlayerClass.DeathKnight,
          spec: WarcraftPlayerSpec.DeathKnightBlood,
          status: InviteStatus.Invited,
          group: "roster"
      })
      }

    });
    return players;
  }

  public static async parseSqlSave(connectionString : ConnectionString, players: BuildPlayer[]) {
    connectionString.players = players;
    connectionString.table = 'buildentity'
    await RosterProvider.saveBuildPlayersSql(JSON.stringify(connectionString)).then((response) => {
      console.log(response)
    })
  }

  public static async parseSqlLoad(connectionString: ConnectionString) {
    const players: BuildPlayer[] = [];
    connectionString.table = 'buildentity'

    await RosterProvider.loadBuildPlayersSql(JSON.stringify(connectionString)).then((roster) =>{
      for (const player of JSON.parse(roster)){
        const spec = player.spec.toLowerCase().split("_")
        players.push({
          name: player.name,
          class: BuildHelper.capitalize(player.className.toLowerCase()) as WarcraftPlayerClass,
          spec: BuildHelper.capitalize(spec[0])+BuildHelper.capitalize(spec[1]) as WarcraftPlayerSpec,
          status: InviteStatus.Unknown,
          group: player.group.slice(-1),
          realm: undefined,
          oldName: player.name
        })
      }
    });
    return players;
  }

  public static humanReadableURL(name: string) {
    return name.substr(0, 50).toLowerCase().replace(/[^\w]/g, "-");
  }

  private static capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
