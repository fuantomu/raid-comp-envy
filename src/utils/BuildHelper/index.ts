import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import { AbsenceResponse, Build, BuildGroups, BuildPlayer, BuildPlayerResponse, BuildRoles, GroupId } from "../../types";
import { RosterProvider } from "../../utils/RosterProvider";
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

  public static async parseGetPlayers() {
    const players: BuildPlayer[] = [];

    await RosterProvider.getPlayers().then((roster) =>{
      if(roster){
        for (const player of roster) {
          const spec = player.spec.split("_")
          if(player){
            players.push({
              id: player.id,
              name: player.name,
              className: BuildHelper.capitalize(player.className.toString()) as WarcraftPlayerClass,
              spec: BuildHelper.capitalize(spec[0])+BuildHelper.capitalize(spec[1]) as WarcraftPlayerSpec,
              race: BuildHelper.capitalize(player.race.toString()) as WarcraftPlayerRace,
              status: InviteStatus.Unknown,
              raid: -1,
              group: "roster",
              oldName: player.name,
              main: player.main?? ""
          })
          }
        }
      }
    });
    return players;
  }

  public static async parseSaveBuild(build: Build) {
    const buildRequest = {
      id: build.id?? UUID(),
      name: build.name,
      date: build.date,
      players: JSON.stringify(build.players.filter((player) => {
        return player.group !== 'roster'
      })),
      instance: build.instance
    }

    await RosterProvider.saveBuild(build.id, buildRequest).then((response) => {
    })
  }

  public static async parseSaveRoster(players: BuildPlayer[]) {
    const buildPlayerRequest: BuildPlayerResponse = {
      players: players
    }
    await RosterProvider.saveRoster(buildPlayerRequest).then((response) => {
    })
  }

  public static async parseDeleteRosterPlayer(player: BuildPlayer) {
    await RosterProvider.deleteRosterPlayer(player.id).then((response) => {
    })
  }

  public static async parseGetBuild(buildId: string) {
    const build : Build = {
      "id": "",
      "name": "",
      "date": new Date().setHours(0,0,0,0),
      "players": [],
      "instance": ""
    };

    await RosterProvider.getBuild(buildId).then((responseBuild) =>{
      if (responseBuild){
        build.id = responseBuild.id;
        build.name = responseBuild.name;
        build.date = responseBuild.date;
        if(responseBuild.players){
          for (const player of JSON.parse(responseBuild.players)){
            build.players.push({
              id: player.id,
              name: player.name,
              className: player.className as WarcraftPlayerClass,
              spec: player.spec as WarcraftPlayerSpec,
              raid: player.raid,
              race: player.race as WarcraftPlayerRace,
              status: InviteStatus.Unknown,
              group: player.group as GroupId,
              oldName: player.oldName,
              main: player.main?? ""
            })
          }
        }
        build.instance = responseBuild.instance
      }

    });
    return build;
  }

  public static async parseDeleteBuild(buildId: string) {

    await RosterProvider.deleteBuild(buildId).then((response) => {
    })
  }

  public static async parseGetBuilds() {
    const builds: Build[] = []

    await RosterProvider.getBuilds().then((response) => {
      if(response){
        for (const build of response){
          const newBuild = {
            id: build.id,
            name: build.name,
            date: build.date,
            players: JSON.parse(build.players),
            instance: build.instance
          }
          builds.push(newBuild)
        }
      }
    })
    return builds;
  }

  public static async parsePostSetup(build : Build, sheetUrl: string, sendMains?: BuildPlayer[], note?: string) {
    //@Crenox
    const data = {
      "content": "<@&840957996304826378> Raidsheet Aktualisierung " + new Date().toLocaleString('de-de'),
      "embeds": [{
        "description": note,
        "title": `${build.name} - ${new Date(build.date).toLocaleString('de-de')}`,
        "color": null,
        "url": sheetUrl,
        "fields": [
          {
              "name": "Group 1",
              "value": build.players.filter(o => o.group === 1).map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 2",
              "value": build.players.filter(o => o.group === 2).map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 3",
              "value": build.players.filter(o => o.group === 3).map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 4",
              "value": build.players.filter(o => o.group === 4).map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 5",
              "value": build.players.filter(o => o.group === 5).map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Bench",
              "value": [...build.players.filter(o => o.group === "bench"),...sendMains?? []].map(p => BuildHelper.getClassEmoji(p.className) + " " + p.name).join("\r\n"),
              "inline": true
          }
        ]
      }]
    }
    await RosterProvider.postSetup(JSON.stringify(data)).then((response) => {
    })
  }

  public static async parseGetAbsences() {
    const absences : AbsenceResponse[] = []

    await RosterProvider.getAbsences().then((response) => {
      if(response){
        for (const absence of response){
          absences.push(absence)
        }
      }
    })
    return absences;
  }

  private static capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
