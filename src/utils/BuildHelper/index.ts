import {
  Instance,
  InviteStatus,
  MessageType,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerRole,
  WarcraftPlayerSpec
} from "../../consts";
import {
  Absence,
  AbsenceData,
  AbsenceResponse,
  Build,
  BuildData,
  BuildGroups,
  BuildPlayer,
  BuildPlayerResponse,
  BuildRoles,
  Difference,
  DiscordMessage,
  GroupId,
  Message,
  PlayerData,
  Update,
  WebSocketMessage
} from "../../types";
import { RosterProvider } from "../../utils/RosterProvider";
import { IconProvider } from "../IconProvider";
import { CustomIcon } from "../IconProvider/consts";
import { RoleProvider } from "../RoleProvider";
import { WarcraftRole } from "../RoleProvider/consts";
import UUID from "../UUID";

export abstract class BuildHelper {
  public static getGroups(players: BuildPlayer[]): BuildGroups {
    const emptyGroups = BuildHelper.getEmptyGroups();
    const groups: BuildGroups = {
      ...emptyGroups,
      bench: {
        group_id: "bench",
        players: []
      }
    };
    for (const player of players ?? []) {
      let group_id: GroupId = player.group_id ?? "bench";
      const group = groups[group_id];
      if (!group) {
        groups[group_id] = {
          group_id,
          players: [player]
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
      groups[group_id] = { group_id, players: [] };
    }
    return groups;
  }

  public static getRoles(players: BuildPlayer[]): BuildRoles {
    const buildRoles: BuildRoles = {
      [WarcraftRole.Unknown]: [],
      [WarcraftRole.Tank]: [],
      [WarcraftRole.Healer]: [],
      [WarcraftRole.RangedDPS]: [],
      [WarcraftRole.MeleeDPS]: []
    };

    for (const player of players) {
      buildRoles[RoleProvider.getSpecRole(player.spec)].push(player);
    }

    return buildRoles;
  }

  public static async parseGetPlayers() {
    const players: BuildPlayer[] = [];

    await RosterProvider.getPlayers().then((roster) => {
      if (roster) {
        for (const player of roster) {
          const spec = player.spec.split("_");
          if (player) {
            players.push({
              id: player.id,
              name: player.name,
              class_name: BuildHelper.capitalize(
                player.class_name.toString()
              ) as WarcraftPlayerClass,
              spec: (BuildHelper.capitalize(spec[0]) +
                BuildHelper.capitalize(spec[1])) as WarcraftPlayerSpec,
              race: BuildHelper.capitalize(player.race.toString()) as WarcraftPlayerRace,
              status: player.status,
              raid: "roster",
              group_id: "roster",
              main: player.main ?? "",
              alt: player.alt ?? "None"
            });
          }
        }
      }
    });
    return players;
  }

  public static async parseSaveBuild(build: Build) {
    const buildRequest = {
      id: build.id ?? UUID(),
      name: build.name,
      date: build.date,
      players: JSON.stringify(
        build.players.filter((player) => {
          return player.group_id !== "roster";
        })
      ),
      instance: build.instance,
      raid_id: build.raid_id.toString()
    };

    await RosterProvider.saveBuild(build.id, buildRequest).then((response) => {});
  }

  public static async parseSaveRoster(players: BuildPlayer[]) {
    const savePlayers = [...players];
    const buildPlayerRequest: BuildPlayerResponse = {
      players: savePlayers
    };
    await RosterProvider.saveRoster(buildPlayerRequest).then((response) => {});
  }

  public static async parseDeleteRosterPlayer(player: BuildPlayer) {
    await RosterProvider.deleteRosterPlayer(player.id).then((response) => {});
  }

  public static async parseGetBuild(build_id: string) {
    const build: Build = {
      id: "",
      name: "",
      date: new Date().setHours(0, 0, 0, 0),
      players: [],
      instance: "",
      build_id: -1,
      raid_id: 0
    };

    await RosterProvider.getRaid(build_id).then((responseBuild) => {
      if (responseBuild) {
        build.id = responseBuild.id;
        build.name = responseBuild.name;
        build.date = responseBuild.date;
        if (responseBuild.players) {
          for (const player of JSON.parse(responseBuild.players)) {
            build.players.push({
              id: player.id,
              name: player.name,
              class_name: player.class_name as WarcraftPlayerClass,
              spec: player.spec as WarcraftPlayerSpec,
              role: (player.role as WarcraftPlayerRole) ?? WarcraftPlayerRole.None,
              swap: player.swap as WarcraftPlayerSpec,
              raid: responseBuild.id,
              race: player.race as WarcraftPlayerRace,
              status: player.status as InviteStatus,
              group_id: player.group_id as GroupId,
              main: player.main ?? "",
              alt: player.alt ?? "None"
            });
          }
        }
        build.instance = responseBuild.instance;
        build.raid_id = parseInt(responseBuild.raid_id);
      }
    });
    return build;
  }

  public static async parseDeleteBuild(id: string) {
    await RosterProvider.deleteBuild(id).then((response) => {});
  }

  public static async parseGetBuilds() {
    const builds: Build[] = [];

    await RosterProvider.getBuilds().then((response) => {
      if (response) {
        for (const build of response) {
          const newBuild = {
            id: build.id,
            name: build.name,
            date: build.date,
            players: JSON.parse(build.players),
            instance: build.instance,
            raid_id: parseInt(build.raid_id),
            build_id: -1
          };
          builds.push(newBuild);
        }
      }
    });
    return builds;
  }

  public static discordMessages = {};

  public static async parsePostSetup(
    build: Build,
    sheetUrl: string,
    sendMains?: BuildPlayer[],
    note?: string,
    version?: string
  ) {
    const messages: DiscordMessage[] = [];
    //@Crenox
    const data = {
      content:
        "<@&840957996304826378> Raidsheet Aktualisierung " +
        new Date().toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
      embeds: [
        {
          description: note,
          title: `${build.name} - ${new Date(build.date).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}`,
          color: null,
          url: sheetUrl,
          fields: [
            {
              name: "Group 1",
              value: build.players
                .filter((o) => o.group_id === 1)
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            },
            {
              name: "Group 2",
              value: build.players
                .filter((o) => o.group_id === 2)
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            },
            {
              name: "Group 3",
              value: build.players
                .filter((o) => o.group_id === 3)
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            },
            {
              name: "Group 4",
              value: build.players
                .filter((o) => o.group_id === 4)
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            },
            {
              name: "Group 5",
              value: build.players
                .filter((o) => o.group_id === 5)
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            },
            {
              name: "Bench",
              value: [...build.players.filter((o) => o.group_id === "bench"), ...(sendMains ?? [])]
                .map((p) => BuildHelper.getClassEmoji(p.class_name) + " " + p.name)
                .join("\r\n"),
              inline: true
            }
          ],
          footer: {
            text: Instance[version].find((instance) => instance.abbreviation === build.instance)
              ?.name,
            icon_url: IconProvider.getCustomIcon(CustomIcon[build.instance])
          }
        }
      ]
    };
    if (this.discordMessages[build.id]){
      await RosterProvider.patchSetup(JSON.stringify(data), this.discordMessages[build.id]).then((response) => {
        messages.push({messageId: this.discordMessages[build.id], buildId: build.id, note: response.embeds[0].description})
      }).catch(async error => {
        if(error.status === 404){
          await RosterProvider.postSetup(JSON.stringify(data)).then((response) => {
            this.discordMessages[build.id] = response.id;
            messages.push({messageId: response.id, buildId: build.id.toString(), note: response.embeds[0].description})
          });
        }
      });
    }
    else{
      await RosterProvider.postSetup(JSON.stringify(data)).then((response) => {
        this.discordMessages[build.id] = response.id;
        messages.push({messageId: response.id, buildId: build.id.toString(), note: response.embeds[0].description})
      });
    }

    return messages;

  }

  public static async parseGetAbsences() {
    const absences: AbsenceResponse[] = [];

    await RosterProvider.getAbsences().then((response) => {
      if (response) {
        for (const absence of response) {
          absences.push(absence);
        }
      }
    });
    return absences;
  }

  public static async parseDeleteAbsence(id: string) {
    await RosterProvider.deleteAbsence(id).then((response) => {});
  }

  public static async parseGetUpdate() {
    const updates: Update = { builds: [], players: [], absences: [] };

    await RosterProvider.getUpdate().then((response) => {
      if (response) {
        for (const absence of response.absences ?? []) {
          updates.absences.push({
            id: absence.id,
            player: { id: absence.player_id } as BuildPlayer,
            start_date: absence.start_date,
            end_date: absence.end_date,
            reason: absence.reason,
            uid: absence.id
          });
        }
        for (const player of response.players ?? []) {
          const spec = player.spec.split("_");
          if (player) {
            updates.players.push({
              id: player.id,
              name: player.name,
              class_name: BuildHelper.capitalize(
                player.class_name.toString()
              ) as WarcraftPlayerClass,
              spec: (BuildHelper.capitalize(spec[0]) +
                BuildHelper.capitalize(spec[1])) as WarcraftPlayerSpec,
              race: BuildHelper.capitalize(player.race.toString()) as WarcraftPlayerRace,
              status:
                (player.status.toString().toLowerCase() as InviteStatus) !== InviteStatus.Benched
                  ? InviteStatus.Unknown
                  : InviteStatus.Benched,
              raid: "roster",
              group_id: "roster",
              main: player.main ?? "",
              alt: player.alt ?? "None"
            });
          }
        }
        for (const build of response.builds ?? []) {
          const newBuild = {
            id: build.id,
            name: build.name,
            date: build.date,
            players: [],
            instance: build.instance,
            raid_id: parseInt(build.raid_id),
            build_id: -1
          };
          if (build.players) {
            for (const player of JSON.parse(build.players)) {
              newBuild.players.push({
                id: player.id,
                name: player.name,
                class_name: player.class_name as WarcraftPlayerClass,
                spec: player.spec as WarcraftPlayerSpec,
                raid: build.id,
                race: player.race as WarcraftPlayerRace,
                status: InviteStatus.Unknown,
                group_id: player.group_id as GroupId,
                main: player.main ?? "",
                alt: player.alt ?? "None"
              });
            }
          }
          updates.builds.push(newBuild);
        }
      }
    });
    return updates;
  }

  public static async getMessages(amount: number): Promise<WebSocketMessage[]> {
    const messages: WebSocketMessage[] = [];
    await RosterProvider.getMessages(amount).then((response) => {
      if (response) {
        response.map((message) => {
          messages.push(message);
          return false;
        });
      }
    });
    return messages;
  }

  private static capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private static getClassEmoji(class_name: WarcraftPlayerClass) {
    switch (class_name) {
      case WarcraftPlayerClass.Warrior:
        return "<:wowwarrior:1067068357964210206>";
      case WarcraftPlayerClass.Deathknight:
        return "<:wowdeathknight:1067068240326578206>";
      case WarcraftPlayerClass.Shaman:
        return "<:wowshaman:1067068361961394277>";
      case WarcraftPlayerClass.Mage:
        return "<:wowmage:1067068319846387753>";
      case WarcraftPlayerClass.Hunter:
        return "<:wowhunter:1067068309050245120>";
      case WarcraftPlayerClass.Warlock:
        return "<:wowwarlock:1067068363290968116>";
      case WarcraftPlayerClass.Paladin:
        return "<:wowpaladin:1067068329833005137>";
      case WarcraftPlayerClass.Priest:
        return "<:wowpriest:1067068342298476604>";
      case WarcraftPlayerClass.Druid:
        return "<:wowdruid:1067068296551202927>";
      case WarcraftPlayerClass.Rogue:
        return "<:wowrogue:1067068360396914698>";
    }
  }

  public static parseMessage(message: WebSocketMessage, builds: Build[], players: BuildPlayer[]) {
    return {
      type: MessageType[message.message_type] ?? message.message_type,
      date: message.date,
      from: message.account_name,
      version: message.version ?? "System",
      changes:
        message.message_type.includes("player") || message.message_type.includes("roster")
          ? this.getPlayerChanges(
              typeof message.data === "string"
                ? (JSON.parse(message.data.toString()) as PlayerData)
                : (message.data as PlayerData),
              builds,
              message.message_type.includes("remove")
            )
          : message.message_type === "absence"
          ? this.getAbsenceChanges(
              typeof message.data === "string"
                ? (JSON.parse(message.data.toString()) as AbsenceData)
                : (message.data as AbsenceData),
              players
            )
          : this.getBuildChanges(
              typeof message.data === "string"
                ? (JSON.parse(message.data.toString()) as BuildData)
                : (message.data as BuildData),
              builds,
              message.message_type.includes("remove") ||
                message.message_type.includes("delete") ||
                message.message_type.includes("reset")
            )
    } as Message;
  }

  private static getPlayerChanges(message: PlayerData, builds: Build[], remove?: boolean) {
    const changes: Difference[] = [];
    const foundBuild = builds.find((build) => build?.id === message.build_id);
    // Update message
    if (message.oldData) {
      const differences = Object.fromEntries(
        Object.entries(message.oldData ?? []).filter(([key, val]) => message.player[key] !== val)
      );
      for (const key of Object.keys(differences)) {
        if ((key === "raid" && message.oldData[key] === "roster") || key === "1") {
          continue;
        }
        const changeMessage = {
          key: key === "0" ? "swap" : key,
          objectType: "Raid",
          objectName: foundBuild
            ? `${foundBuild?.name} - ${new Date(foundBuild?.date).toLocaleString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}`
            : undefined,
          propertyName: message.player.name,
          propertyType: "Player",
          old: ["raid"].includes(key)
            ? builds.find((build) => build?.id === message.oldData[key])?.name
            : ["spec"].includes(key)
            ? message.oldData[key].split(/(?=[A-Z])/).pop()
            : message.oldData[key],
          new: ["raid"].includes(key)
            ? builds.find((build) => build?.id === message.player[key])?.name
            : ["spec"].includes(key)
            ? message.player[key].split(/(?=[A-Z])/).pop()
            : key === "0"
            ? message.player
            : message.player[key]
        };
        changes.push(changeMessage);
      }
    } else {
      const changeMessage = {
        key: remove ? "remove" : "add",
        objectType: "Raid",
        objectName: foundBuild
          ? `${foundBuild?.name} - ${new Date(foundBuild?.date).toLocaleString("de-de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}`
          : undefined,
        propertyName: message.player.name,
        propertyType: "Player",
        new: message.player.raid
      };
      changes.push(changeMessage);
    }
    return changes;
  }

  private static getBuildChanges(message: BuildData, builds: Build[], remove?: boolean) {
    const changes: Difference[] = [];
    const foundBuild = builds.find((build) => build?.id === message?.build.id);
    // Update message
    if (message?.oldData) {
      const differences = Object.fromEntries(
        Object.entries(message.oldData ?? []).filter(
          ([key, val]) => key !== "players" && message?.build[key] !== val
        )
      );
      const instances = Object.keys(Instance)
        .map((key) => Instance[key])
        .flat();
      Object.keys(differences).forEach((key) => {
        const changeMessage = {
          key,
          objectType: "Build",
          propertyName: foundBuild
            ? `${foundBuild?.name} - ${new Date(foundBuild?.date).toLocaleString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}`
            : message.build.name,
          propertyType: "Build",
          old: ["date"].includes(key)
            ? new Date(message.oldData[key]).toLocaleString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            : instances.find((instance) => instance.abbreviation === message.oldData[key])?.name,
          new: ["date"].includes(key)
            ? new Date(message.build[key]).toLocaleString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            : instances.find((instance) => instance.abbreviation === message.build[key])?.name
        };
        changes.push(changeMessage);
      });
    } else {
      const changeMessage = {
        key: remove ? "remove" : "add",
        objectType: "Build",
        propertyName: foundBuild
          ? `${foundBuild?.name} - ${new Date(foundBuild?.date).toLocaleString("de-de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}`
          : message.build.name,
        propertyType: "Build",
        new: foundBuild
          ? `${foundBuild?.name} - ${new Date(foundBuild?.date).toLocaleString("de-de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}`
          : message.build.name
      };
      changes.push(changeMessage);
    }
    return changes;
  }

  private static getAbsenceChanges(message: AbsenceData, players: BuildPlayer[]) {
    const changes: Difference[] = [];
    const foundPlayer = players.find((player) => player?.id === message.player_id);

    const changeMessage = {
      key: "absence",
      objectType: "Absence",
      propertyName: foundPlayer?.name ?? message.player_id,
      propertyType: "Player",
      new: new Date(message.end_date).toLocaleDateString("de-de", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }),
      old: new Date(message.start_date).toLocaleDateString("de-de", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
    };
    changes.push(changeMessage);

    return changes;
  }

  public static isPlayerAlreadyInRaid(player: BuildPlayer, raids: Build[]): boolean {
    const playerRaid = raids.find((build) => {
      return build.id === player.raid;
    });
    if (playerRaid) {
      const isInParty = playerRaid.players.find((partyPlayer: BuildPlayer) => {
        return partyPlayer.id === player.id;
      });
      if (isInParty) {
        return true;
      }
      return false;
    }
    return false;
  }

  public static isPlayerMovedBetweenRaids(player: BuildPlayer, raids: Build[]): boolean {
    const otherRaids = raids.filter((raid) => {
      return raid.id !== player.raid;
    });
    const otherPlayers = [];
    otherRaids.map((otherRaid) => {
      otherPlayers.push(...otherRaid.players);
      return 1;
    });
    const isInOtherRaids = otherPlayers.find((raidPlayer: BuildPlayer) => {
      return raidPlayer.id === player.id;
    });
    if (isInOtherRaids) {
      return true;
    }
    return false;
  }

  public static isSameInstance(player: BuildPlayer, raids: Build[]): boolean {
    const otherRaids = raids.filter((raid) => {
      return raid.id !== player.raid;
    });
    const sameInstance = otherRaids.find(
      (otherRaid) => otherRaid.instance === raids.find((raid) => raid.id === player.raid)?.instance
    );
    if (sameInstance) {
      return true;
    }
    return false;
  }

  public static isSameLockout(player: BuildPlayer, raids: Build[]): boolean {
    const currentDate = new Date(Math.min(...raids.map((raid) => raid.date)));
    const otherRaids = raids.filter((raid) => {
      return raid.id !== player.raid;
    });
    // Get the next reset time
    currentDate.setDate(currentDate.getDate() + ((3 + 7 - currentDate.getDay()) % 7 || 7));
    currentDate.setHours(0, 0, 0, 0);
    const sameLockout = otherRaids.find((otherBuild) => {
      return (
        new Date(raids.find((raid) => raid.id === player.raid)?.date).setHours(0, 0, 0, 0) -
          currentDate.getTime() <=
          0 && new Date(otherBuild.date).setHours(0, 0, 0, 0) - currentDate.getTime() <= 0
      );
    });
    if (sameLockout) {
      return true;
    }
    return false;
  }

  public static hasCharacterInRaid(character: BuildPlayer, raid: Build) {
    if (raid.players.find((player) => this.isAlt(player, character))) {
      return true;
    }
    return false;
  }

  public static isPlayerAbsent(player: BuildPlayer, time: number, absence: Absence[]): boolean {
    for (const absentPlayer of absence) {
      if (absentPlayer.player.name === player.name || absentPlayer.player.name === player.main) {
        if (absentPlayer.start_date <= time && absentPlayer.end_date >= time) {
          return true;
        }
        continue;
      }
    }
    return false;
  }

  public static isAlt(potentialAlt: BuildPlayer, character: BuildPlayer): boolean {
    if (
      potentialAlt.id !== character.id &&
      (potentialAlt.main === character.name || potentialAlt.main === character.main)
    ) {
      return true;
    }
    return false;
  }

  public static async parseGetDiscordMessages() {
    const discordMessages: DiscordMessage[] = [];

    await RosterProvider.getDiscordMessages().then((response) => {
      if (response) {
        for (const message of response) {
          const newMessage = {
            messageId: message.messageId,
            buildId: message.buildId,
            note: message.note
          };
          discordMessages.push(newMessage);
          this.discordMessages[message.buildId] = message.messageId;
        }
      }
    });
    return discordMessages;
  }
}
