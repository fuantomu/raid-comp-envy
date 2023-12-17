import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import { Build, BuildGroups, BuildPlayer, BuildRoles, ConnectionString, GroupId } from "../../types";
import { RosterProvider } from "../../utils/RosterProvider";
import { PlayerUtils } from "../PlayerUtils";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";
import UUID from "../UUID";

export abstract class BuildHelper {
  public static getGroups(players: BuildPlayer[], getEmpty: boolean = false): BuildGroups {
    const emptyGroups = getEmpty ? BuildHelper.getEmptyGroups() : {};
    const groups: BuildGroups = {
      ...emptyGroups,
      none: {
        groupId: "bench",
        players: [],
      },
    };
    for (const player of players) {
      let groupId: GroupId = player.group?? "bench";
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
          const pclass = BuildHelper.fixTankClasses(player.class, player.spec).replace("DK","Deathknight")

          players.push({
            id: UUID(),
            name: player.name,
            class: pclass as WarcraftPlayerClass,
            spec: (pclass + spec) as WarcraftPlayerSpec,
            status: InviteStatus.Unknown,
            group: "roster",
            raid: -1,
            realm: undefined,
            oldName: player.name,
            main: ""
        })}
      } catch (error) {
        players.push({
          id: UUID(),
          name: "ErrorInvalidID",
          class: WarcraftPlayerClass.Deathknight,
          raid: -1,
          spec: WarcraftPlayerSpec.DeathknightBlood,
          status: InviteStatus.Unknown,
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
          players.push({
            id: player.id,
            name: player.name,
            class: player.class as WarcraftPlayerClass,
            spec: player.spec as WarcraftPlayerSpec,
            race: player.race as WarcraftPlayerRace,
            status: InviteStatus.Unknown,
            raid: -1,
            group: "roster",
            realm: undefined,
            oldName: player.name,
            main: player.main?? ""
        })}
      } catch (error) {
        console.log(error)
      }

    });
    return players;
  }

  public static async parseSqlBuildSave(connectionString : ConnectionString, players: BuildPlayer[]) {
    connectionString.players = players.filter((player) => {
      return player.group !== 'roster'
    });
    connectionString.table = 'BuildEntity'

    await RosterProvider.saveBuildPlayersSql(JSON.stringify(connectionString)).then((response) => {
    })
  }

  public static async parseSqlRosterSave(connectionString : ConnectionString, players: BuildPlayer[]) {
    connectionString.table = 'PlayerEntity';
    connectionString.players = players;

    await RosterProvider.saveRosterPlayersSql(JSON.stringify(connectionString)).then((response) => {
    })
  }

  public static async parseSqlRosterDeletePlayers(connectionString : ConnectionString, players: BuildPlayer[]) {
    connectionString.table = 'PlayerEntity';
    connectionString.players = players;

    await RosterProvider.deleteRosterPlayersSql(JSON.stringify(connectionString)).then((response) => {
    })
  }

  public static async parseSqlLoad(connectionString: ConnectionString) {
    const players: BuildPlayer[] = [];
    connectionString.table = 'BuildEntity'

    await RosterProvider.loadBuildPlayersSql(JSON.stringify(connectionString)).then((build) =>{
      if (build){
        for (const player of JSON.parse(build)){
          const spec = player.spec.toLowerCase().split("_")
          players.push({
            id: player.id,
            name: player.name,
            class: BuildHelper.capitalize(player.className.toLowerCase()) as WarcraftPlayerClass,
            spec: BuildHelper.capitalize(spec[0])+BuildHelper.capitalize(spec[1]) as WarcraftPlayerSpec,
            raid: -1,
            race: BuildHelper.capitalize(player.race? player.race.toLowerCase() : "human") as WarcraftPlayerRace,
            status: InviteStatus.Unknown,
            group: player.group.toLowerCase() === 'bench'? 'bench' : player.group.slice(-1),
            realm: undefined,
            oldName: player.name,
            main: player.main?? ""
          })
        }
      }

    });
    return players;
  }

  public static async parseSqlDelete(connectionString : ConnectionString) {
    connectionString.table = 'BuildEntity'

    await RosterProvider.deleteBuildPlayersSql(JSON.stringify(connectionString)).then((response) => {
    })
  }

  public static async parseBuildsLoad(connectionString : ConnectionString) {
    connectionString.table = 'BuildEntity'
    const builds: string[] = []

    await RosterProvider.loadBuildsSql(JSON.stringify(connectionString)).then((response) => {
      if(response){
        for (const build of response){
          builds.push(build)
        }
      }
    })
    return builds;
  }

  public static async parsePostSetup(build : Build, sheetUrl: string) {
    //@Crenox
    const data = {
      "content": "<@&840957996304826378> Raidsheet Aktualisierung " + new Date().toLocaleString('de-de'),
      "embeds": [{
        "description": "",
        "title": build.name,
        "color": null,
        "url": sheetUrl,
        "fields": [
          {
              "name": "Group 1",
              "value": build.players.filter(o => o.group as String === "1").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 2",
              "value": build.players.filter(o => o.group as String === "2").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 3",
              "value": build.players.filter(o => o.group as String === "3").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 4",
              "value": build.players.filter(o => o.group as String === "4").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 5",
              "value": build.players.filter(o => o.group as String === "5").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Bench",
              "value": build.players.filter(o => o.group as String === "bench").map(p => BuildHelper.getClassEmoji(p.class) + " " + p.name).join("\r\n"),
              "inline": true
          }
        ]
      }]
    }
    await RosterProvider.postSetup(JSON.stringify(data)).then((response) => {
    })
  }

  public static async parseAbsenceLoad(connectionString : ConnectionString) {
    connectionString.table = 'AbsenceEntity'
    const absences : any[] = []

    await RosterProvider.loadAbsence(JSON.stringify(connectionString)).then((response) => {
      if(response){
        for (const absence of response){
          absences.push(absence)
        }
      }
    })
    return absences;
  }

  public static humanReadableURL(name: string) {
    return name.substr(0, 50).toLowerCase().replace(/[^\w]/g, "-");
  }

  private static capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private static getClassEmoji(className: WarcraftPlayerClass){
    switch(className){
      case WarcraftPlayerClass.Warrior:
        return "<:wowwarrior:1067068357964210206>"
      case WarcraftPlayerClass.Deathknight:
        return "<:wowdeathknight:1067068240326578206>"
      case WarcraftPlayerClass.Shaman:
        return "<:wowshaman:1067068361961394277>"
      case WarcraftPlayerClass.Mage:
        return "<:wowmage:1067068319846387753>"
      case WarcraftPlayerClass.Hunter:
        return "<:wowhunter:1067068309050245120>"
      case WarcraftPlayerClass.Warlock:
        return "<:wowwarlock:1067068363290968116>"
      case WarcraftPlayerClass.Paladin:
        return "<:wowpaladin:1067068329833005137>"
      case WarcraftPlayerClass.Priest:
        return "<:wowpriest:1067068342298476604>"
      case WarcraftPlayerClass.Druid:
        return "<:wowdruid:1067068296551202927>"
      case WarcraftPlayerClass.Rogue:
        return "<:wowrogue:1067068360396914698>"
    }
  }
}
