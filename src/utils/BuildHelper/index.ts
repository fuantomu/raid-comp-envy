import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import { AbsenceResponse, Build, BuildGroups, BuildPlayer, BuildPlayerResponse, BuildRoles, GroupId, Update } from "../../types";
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
        group_id: "bench",
        players: [],
      },
    };
    for (const player of players?? []) {
      let group_id: GroupId = player.group_id?? "bench";
      const group = groups[group_id];
      if (!group) {
        groups[group_id] = {
          group_id,
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
    for (let group_id = 1; group_id <= 5; group_id++) {
      groups[group_id] = { group_id , players: [] };
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
              class_name: BuildHelper.capitalize(player.class_name.toString()) as WarcraftPlayerClass,
              spec: BuildHelper.capitalize(spec[0])+BuildHelper.capitalize(spec[1]) as WarcraftPlayerSpec,
              race: BuildHelper.capitalize(player.race.toString()) as WarcraftPlayerRace,
              status: InviteStatus.Unknown,
              raid: -1,
              group_id: "roster",
              oldName: player.name,
              main: player.main?? "",
              alt: player.alt
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
        return player.group_id !== 'roster'
      })),
      instance: build.instance,
      raid_id: build.raid_id.toString()
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

  public static async parseGetBuild(build_id: string) {
    const build : Build = {
      "id": "",
      "name": "",
      "date": new Date().setHours(0,0,0,0),
      "players": [],
      "instance": "",
      "build_id": -1,
      "raid_id": 0
    };

    await RosterProvider.getBuild(build_id).then((responseBuild) =>{
      if (responseBuild){
        build.id = responseBuild.id;
        build.name = responseBuild.name;
        build.date = responseBuild.date;
        if(responseBuild.players){
          for (const player of JSON.parse(responseBuild.players)){
            build.players.push({
              id: player.id,
              name: player.name,
              class_name: player.class_name as WarcraftPlayerClass,
              spec: player.spec as WarcraftPlayerSpec,
              raid: player.raid,
              race: player.race as WarcraftPlayerRace,
              status: player.status as InviteStatus,
              group_id: player.group_id as GroupId,
              oldName: player.oldName,
              main: player.main?? "",
              alt: player.alt
            })
          }
        }
        build.instance = responseBuild.instance;
        build.raid_id = parseInt(responseBuild.raid_id);
      }

    });
    return build;
  }

  public static async parseDeleteBuild(build_id: string) {

    await RosterProvider.deleteBuild(build_id).then((response) => {
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
            instance: build.instance,
            raid_id: parseInt(build.raid_id),
            build_id: -1
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
      "content": "<@&840957996304826378> Raidsheet Aktualisierung " + new Date().toLocaleString("de-DE", {day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),
      "embeds": [{
        "description": note,
        "title": `${build.name} - ${new Date(build.date).toLocaleString("de-DE", {day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}`,
        "color": null,
        "url": sheetUrl,
        "fields": [
          {
              "name": "Group 1",
              "value": build.players.filter(o => o.group_id === 1).map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 2",
              "value": build.players.filter(o => o.group_id === 2).map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 3",
              "value": build.players.filter(o => o.group_id === 3).map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 4",
              "value": build.players.filter(o => o.group_id === 4).map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Group 5",
              "value": build.players.filter(o => o.group_id === 5).map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
              "inline": true
          },
          {
              "name": "Bench",
              "value": [...build.players.filter(o => o.group_id === "bench"),...sendMains?? []].map(p => BuildHelper.getClassEmoji(p.class_name) + " " + p.name).join("\r\n"),
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

  public static async parseGetUpdate() {
    const updates : Update = { builds : [], players : [], absences: []}

    await RosterProvider.getUpdate().then((response) => {
      if(response){
        for (const absence of response.absences?? []){
          updates.absences.push({
            id: absence.id,
            player: {id: absence.player_id} as BuildPlayer,
            start_date: absence.start_date,
            end_date: absence.end_date,
            reason: absence.reason
          })
        }
        for (const player of response.players?? []){
            const spec = player.spec.split("_")
            if(player){
              updates.players.push({
                id: player.id,
                name: player.name,
                class_name: BuildHelper.capitalize(player.class_name.toString()) as WarcraftPlayerClass,
                spec: BuildHelper.capitalize(spec[0])+BuildHelper.capitalize(spec[1]) as WarcraftPlayerSpec,
                race: BuildHelper.capitalize(player.race.toString()) as WarcraftPlayerRace,
                status: InviteStatus[BuildHelper.capitalize(player.status)],
                raid: -1,
                group_id: "roster",
                oldName: player.name,
                main: player.main?? "",
                alt: player.alt
            })
          }
        }
        for (const build of response.builds?? []){
          const newBuild = {
            id: build.id,
            name: build.name,
            date: build.date,
            players: [],
            instance: build.instance,
            raid_id: parseInt(build.raid_id),
            build_id: -1
          }
          if(build.players){
            for (const player of JSON.parse(build.players)){
              newBuild.players.push({
                id: player.id,
                name: player.name,
                class_name: player.class_name as WarcraftPlayerClass,
                spec: player.spec as WarcraftPlayerSpec,
                raid: player.raid,
                race: player.race as WarcraftPlayerRace,
                status: InviteStatus.Unknown,
                group_id: player.group_id as GroupId,
                oldName: player.oldName,
                main: player.main?? "",
                alt: player.alt
              })
            }
          }
          updates.builds.push(newBuild)
        }
      }
    })
    return updates;
  }

  private static capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private static getClassEmoji(class_name: WarcraftPlayerClass){
    switch(class_name){
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
