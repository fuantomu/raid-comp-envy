/** @jsxImportSource @emotion/react */
import { FC, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContextProvider } from "../../components/App/context";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import {
  Absence,
  AbsenceData,
  Build,
  BuildData,
  BuildPlayer,
  MessageData,
  PlayerData,
  SelectOption,
  Update
} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import { Instance, InviteStatus, RegisteredMessages } from "../../consts";
import Raid from "../../components/Raid";
import ModalAlert from "../../components/ModalAlert";
import { sortFunctions } from "../../utils/sorting";
import { socketId, useUpdateSocketContext } from "../../components/UpdateSocket/context";
import ScrollingSidebar from "../../components/ScrollingSidebar";
import UUID from "../../utils/UUID";

export interface EditBuildPageProps {
  accountName: string;
  accountRole: number;
  manager: any;
  changeVersionRef: any;
}

const EditBuildPage: FC<EditBuildPageProps> = ({
  accountName,
  accountRole,
  manager,
  changeVersionRef
}) => {
  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [raids, setRaids] = useState<Build[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [buildSelection, setBuildSelection] = useState<SelectOption[]>([]);
  const [selectedBuilds, setSelectedBuilds] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState(localStorage.getItem("LastVersion") ?? "Wotlk");
  const [absence, setAbsence] = useState<Absence[]>([]);
  const [maxRaidId, setMaxRaidId] = useState(0);
  const webSocket = useUpdateSocketContext((message: MessageData) => {
    if (RegisteredMessages.roster.includes(message.message_type)) {
      const data: PlayerData = message.data as PlayerData;
      if (data) {
        updateRoster(data.player, false, message.message_type === "removeroster");
      }
    } else if (RegisteredMessages.build.includes(message.message_type)) {
      if (message.message_type.includes("player")) {
        const data: PlayerData = message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) =>
            selectedBuild?.value === (data.build_id === "roster" ? data.player.raid : data.build_id)
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = foundBuild.value;
          switch (message.message_type) {
            case "addplayer": {
              addPlayerToRaid(data.player, false);
              return;
            }
            case "updateplayer": {
              updatePlayer(data.player, false);
              return;
            }
            case "removeplayer": {
              removePlayerFromRaid(data.player, false, false, data.build_id);
              return;
            }
            case "moveplayer": {
              movePlayer(data.player, data.oldData?.raid, false);
              return;
            }
            case "swapplayer": {
              swapPlayer(data.player, data.oldData?.raid ?? data.build_id, false, false);
              return;
            }
          }
        }
      } else {
        const data: BuildData = message.data as BuildData;
        const foundBuild = builds.find((build) => build?.id === data.build.id);
        if (!foundBuild) {
          switch (message.message_type) {
            case "addbuild": {
              addBuild(data.build.name, data.build.build_id, false, false, data.build.id);
              return;
            }
            case "removebuild": {
              setBuildSelection(buildSelection.filter((build) => build.value !== data.build.id));
              return;
            }
          }
        } else {
          if (message.message_type === "removebuild") {
            deleteBuild(foundBuild.id, false);
            return;
          }
        }

        const foundSelectedBuild = selectedBuilds.find((build) => build.value === data.build.id);
        if (foundSelectedBuild) {
          switch (message.message_type) {
            case "resetbuild": {
              resetBuild(foundSelectedBuild.value, false);
              return;
            }
            case "updatebuild": {
              if (foundSelectedBuild) {
                if (foundSelectedBuild.date !== data.build.date) {
                  handleDateSelect(
                    raids[selectedBuilds.indexOf(foundSelectedBuild)].build_id,
                    data.build.date,
                    false
                  );
                }
                if (
                  raids[selectedBuilds.indexOf(foundSelectedBuild)].instance !== data.build.instance
                ) {
                  setBuildInstance(
                    raids[selectedBuilds.indexOf(foundSelectedBuild)].build_id,
                    data.build.instance,
                    false
                  );
                }
              }
              return;
            }
          }
        }
      }
    } else if (RegisteredMessages.absence.includes(message.message_type)) {
      const data: AbsenceData = message.data as AbsenceData;
      const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player_id);
      if (foundPlayer) {
        const newAbsence = {
          id: `${foundPlayer.name}-${data.start_date}-${data.end_date}-${data.reason?.length}`,
          player: foundPlayer,
          start_date: data.start_date,
          end_date: data.end_date,
          reason: data.reason
        } as Absence;
        setAbsence([...absence, newAbsence]);
        updateRaidStatus(raids, roster, [...absence, newAbsence]);
        updateRosterStatus(roster, raids, [...absence, newAbsence]);
      }
    }
  });

  const message = {
    socketId,
    message_type: "",
    data: {},
    account_name: accountName,
    date: new Date().getTime(),
    version: version
  };

  let openEditModal: any = () => {};
  let handleModalOpen: any = () => {};

  const MAX_SET_CHARACTERS = 2;
  const MAX_RAIDS = 2;

  const getSelectedBuilds = () => {
    return selectedBuilds ?? [];
  };

  const getBuildSelections = () => {
    return buildSelection ?? [];
  };

  const getAccountRole = () => {
    return accountRole;
  };

  const getRaid = (id: string): Build => {
    return raids.find((raid) => raid.id === id) ?? getEmptyBuild(version);
  };

  const getBuilds = (): Build[] => {
    return builds;
  };

  const getVersion = (): string => {
    return version ?? "Wotlk";
  };

  const getAlts = (player: BuildPlayer): BuildPlayer[] => {
    return roster.filter((rosterPlayer) => BuildHelper.isAlt(rosterPlayer, player));
  };

  const getMains = (players: BuildPlayer[] = roster): BuildPlayer[] => {
    return players.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name;
    });
  };

  const handleShowError = (callback: any) => {
    handleModalOpen = callback;
  };

  const getPlayerAbsence = (player: string, date: number) => {
    return [
      ...absence.filter(
        (absentPlayer) =>
          (absentPlayer.player.name === player || absentPlayer.player.main === player) &&
          absentPlayer.end_date >= date
      )
    ];
  };

  const getAbsentPlayers = (id: string, raid?: Build): BuildPlayer[] => {
    const playerBuild = getRaid(id) ?? raid;
    const foundPlayers = roster.filter((player: BuildPlayer) => {
      const playerAbsence = getPlayerAbsence(player.main ?? player.name, playerBuild?.date);
      if (player.name !== player.main) {
        return false;
      }
      if (playerAbsence?.length !== 0) {
        return playerAbsence?.find(
          (absence) =>
            absence.start_date <= playerBuild?.date && absence.end_date >= playerBuild?.date
        );
      }
      return false;
    });
    return foundPlayers;
  };

  const getUnsetMains = (id: string): BuildPlayer[] => {
    const mains = roster.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name;
    });
    const setMains: BuildPlayer[] = [];
    mains.forEach((main) => {
      raids.forEach((raid) => {
        if (raid?.id === id) {
          raid?.players.forEach((player) => {
            if (BuildHelper.isAlt(player, main) || player.name === main.name) {
              setMains.push(main);
            }
          });
        }
      });
    });
    const unsetMains = [];
    mains.forEach((main) => {
      if (!setMains.includes(main)) {
        if (
          main.alt !== undefined &&
          main.alt !== "None" &&
          main.status === InviteStatus.Accepted
        ) {
          unsetMains.push(roster.find((rosterPlayer) => rosterPlayer.name === main.alt));
        } else {
          unsetMains.push(main);
        }
      }
    });
    return unsetMains;
  };

  const getEmptyBuild = (game_version?: string, build_id?: number) => {
    return {
      id: UUID(),
      name: "New Build",
      date: new Date().setHours(0, 0, 0, 0),
      players: [],
      instance: Instance[game_version]
        ? Instance[game_version][0].abbreviation
        : Instance["Wotlk"][0].abbreviation,
      build_id: build_id ?? -1
    } as Build;
  };

  const getBuildCopy = (build: Build): Build => {
    if (!build) {
      return getEmptyBuild(version);
    }
    const newBuild: Build = {
      id: build.id,
      date: build.date,
      instance: build.instance,
      name: build.name,
      players: build.players,
      raid_id: build.raid_id,
      build_id: build.build_id
    };
    return newBuild;
  };

  const deleteAbsence = (item: Absence) => {
    const newAbsence = absence.filter((absence) => absence.uid !== item.uid);
    setAbsence(newAbsence);
    BuildHelper.parseDeleteAbsence(item.uid);
  };

  const handleChangeVersion = async (selectedVersion: string) => {
    setVersion(selectedVersion);
    loadBuilds(builds, selectedVersion).then(() => {
      updateRosterStatus();
    });
    localStorage.setItem("LastVersion", selectedVersion);
  };

  const handleBuildSelect = (build_id: number, value: any) => {
    localStorage.setItem(`LastBuild-${build_id}`, value.value ?? value);
    BuildHelper.parseGetBuild(value.value ?? value).then((build) => {
      build.build_id = build_id;
      selectedBuilds[build_id] = buildSelection.find(
        (buildSelect) => buildSelect.value === build.id
      );
      raids[build_id] = build;
      setRaids([...raids]);
      updateRaidStatus();
      updateRosterStatus();
    });
  };

  const handleDateSelect = (build_id: number, value: any, send: boolean = true) => {
    const oldRaid = getBuildCopy(raids[build_id]);
    if (oldRaid) {
      if (oldRaid.date === value.valueOf()) {
        return;
      }
    }
    raids.map((raid) => {
      if (raid.build_id === build_id) {
        raid.date = value.valueOf();
      }
      return raid;
    });
    setRaids([...raids]);
    builds.map((build) => {
      build.date = value.valueOf();
      return build;
    });
    buildSelection.map((buildSelect) => {
      if (buildSelect.value === raids[build_id].id) {
        buildSelect.date = value.valueOf();
        buildSelect.label = `${raids[build_id].name} - ${new Date(buildSelect.date).toLocaleString(
          "de-DE",
          { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
        )}`;
        selectedBuilds[build_id].label = buildSelect.label;
        selectedBuilds[build_id].date = buildSelect.date;
      }
      return buildSelect;
    });
    selectedBuilds.map((build) => {
      if (build.value === raids[build_id].id) {
        build.date = value.valueOf();
        build.label = `${raids[build_id].name} - ${new Date(build.date).toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}`;
      }
      return build;
    });
    setSelectedBuilds([...selectedBuilds]);
    updateRaidStatus();
    updateRosterStatus();
    saveBuild(raids[build_id]);
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(raids[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldRaid;
      message.data["oldData"]["players"] = [];
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer, fromRoster: boolean) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer, fromRoster: boolean = false) => {
    if (openEditModal) {
      openEditModal(player, fromRoster);
    }
  };

  const setBuildInstance = (build_id: number, value: any, send: boolean = true) => {
    const oldRaid = getBuildCopy(raids[build_id]);
    if (oldRaid) {
      if (oldRaid.instance === value.value ?? value) {
        return;
      }
    }
    const newRaids = raids.map((raid) => {
      if (raid.build_id === build_id) {
        raid.instance = value.value ?? value;
      }
      return raid;
    });
    setRaids([...newRaids]);
    saveBuild(raids[build_id]);
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(raids[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldRaid;
      message.data["oldData"]["players"] = [];
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const saveBuild = async (build: Build) => {
    if (build.name === common("build.new")) {
      return;
    }
    if (build.name === undefined) {
      return;
    }
    BuildHelper.parseSaveBuild(build);
  };

  const resetBuild = (id: string, send: boolean = true) => {
    const currentRaid = getRaid(id);
    const newBuild = getEmptyBuild(version);
    newBuild.name = currentRaid.name;
    newBuild.id = currentRaid.id;
    newBuild.raid_id = currentRaid.raid_id;
    raids.map((raid) => {
      if (raid.id === newBuild.id) {
        raid = newBuild;
      }
      return false;
    });
    updateRaidStatus();
    updateRosterStatus();
    setRaids([...raids]);
    saveBuild(newBuild);
    if (send) {
      message.message_type = "resetbuild";
      message.data["build"] = newBuild;
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const addBuild = async (
    name: string,
    build_id: number,
    save?: boolean,
    send: boolean = true,
    oldId?: string
  ) => {
    const newBuild = getEmptyBuild(version);
    newBuild.name = name;
    newBuild.build_id = build_id;
    newBuild.raid_id = maxRaidId + 1;
    if (oldId) {
      newBuild.id = oldId;
    }
    setMaxRaidId(maxRaidId + 1);

    const newBuildSelect = {
      value: newBuild.id,
      label: `${name} - ${new Date(new Date().setHours(0, 0, 0)).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`,
      date: new Date().setHours(0, 0, 0)
    };
    setBuildSelection([...buildSelection, newBuildSelect].sort((a, b) => b.date - a.date));
    setBuilds([...builds, newBuild]);
    if (save) {
      saveBuild(newBuild);
    }
    if (send) {
      message.message_type = "addbuild";
      message.data["build"] = newBuild;
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const deleteBuild = async (id: string, send: boolean = true) => {
    const oldRaid = getRaid(id);
    const newBuilds = [...buildSelection.filter((build) => build.value !== oldRaid.id)];
    setBuildSelection([...newBuilds].sort((a, b) => b.date - a.date));

    const buildIsSet = selectedBuilds.find((selectedBuild) => selectedBuild.value === id);
    if (buildIsSet) {
      const newBuild = getEmptyBuild(version);
      newBuild.build_id = oldRaid.build_id;
      raids[oldRaid.build_id] = newBuild;
      selectedBuilds[oldRaid.build_id] = { value: newBuild.id, label: newBuild.name };
      localStorage.removeItem(`LastBuild-${oldRaid.build_id}`);
    }
    updateRosterStatus();
    setBuilds([...builds.filter((build) => build.id !== id)]);
    BuildHelper.parseDeleteBuild(oldRaid.id);
    if (send) {
      message.message_type = "removebuild";
      message.data["build"] = oldRaid;
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const updateRoster = (
    newPlayer: BuildPlayer,
    send: boolean = true,
    remove: boolean = false
  ): void => {
    const oldPlayer = roster.find((player) => player.id === newPlayer.id);
    const newRoster = [...roster.filter((player) => player.id !== newPlayer.id)];

    if (remove) {
      BuildHelper.parseDeleteRosterPlayer(newPlayer);
    } else {
      if (oldPlayer) {
        const differences = Object.fromEntries(
          Object.entries(oldPlayer).filter(([key, val]) => newPlayer[key] !== val)
        );
        if (Object.entries(differences).length === 0) {
          return;
        }
      }
      newRoster.push(newPlayer);
      BuildHelper.parseSaveRoster(newRoster);
    }
    updateRosterStatus([...newRoster]);

    if (send) {
      message.message_type = remove ? "removeroster" : "updateroster";
      message.version = "None";
      message.data["player"] = newPlayer;
      message.data["oldData"] = remove ? undefined : oldPlayer;
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const addPlayerToRaid = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentRaid = getRaid(newPlayer.raid);
    currentRaid.players = [...currentRaid.players, newPlayer];

    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);
    if (send) {
      message.message_type = "addplayer";
      message.data = { player: newPlayer, build_id: newPlayer.raid };
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const updatePlayer = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentRaid = getRaid(newPlayer.raid);
    const oldPlayer = currentRaid.players.find((player) => player.id === newPlayer.id);
    if (oldPlayer) {
      const differences = Object.fromEntries(
        Object.entries(oldPlayer).filter(([key, val]) => newPlayer[key] !== val)
      );
      if (Object.entries(differences).length === 0) {
        return;
      }
    }
    const otherPlayers = currentRaid.players.filter((player) => {
      return player.id !== newPlayer.id;
    });
    currentRaid.players = [...otherPlayers, newPlayer];

    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);
    if (send) {
      message.message_type = "updateplayer";
      message.data = { player: newPlayer, build_id: newPlayer.raid, oldData: oldPlayer };
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const removePlayerFromRaids = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true
  ): void => {
    raids.forEach((raid) => {
      removePlayerFromRaid(newPlayer, save, send, raid.id);
    });
  };

  const removePlayerFromRaid = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true,
    oldRaid?: string
  ): void => {
    raids.map((raid) => {
      if (raid.id === oldRaid ?? newPlayer.raid) {
        raid.players = raid.players.filter((player) => player.id !== newPlayer.id);
      }
      return false;
    });

    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);

    if (save) {
      saveBuild(raids.find((raid) => raid.id === oldRaid ?? newPlayer.id));
    }
    if (send) {
      message.message_type = "removeplayer";
      const newPlayerCopy: BuildPlayer = {
        id: newPlayer.id,
        name: newPlayer.name,
        class_name: newPlayer.class_name,
        alt: newPlayer.alt,
        main: newPlayer.main,
        group_id: newPlayer.group_id,
        race: newPlayer.race,
        status: newPlayer.status,
        spec: newPlayer.spec,
        raid: newPlayer.raid
      };
      message.data = { player: newPlayerCopy, build_id: oldRaid };
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const movePlayer = (newPlayer: BuildPlayer, oldRaid?: string, send: boolean = true): void => {
    if (oldRaid === "roster") {
      raids.map((raid) => {
        if (
          raid.id !== newPlayer.raid &&
          BuildHelper.isSameInstance(newPlayer, raids) &&
          BuildHelper.isSameLockout(newPlayer, raids)
        ) {
          removePlayerFromRaid(newPlayer, true, false, raid.id);
          oldRaid = raid.id;
        }
        return false;
      });
    } else {
      removePlayerFromRaid(newPlayer, true, false, oldRaid);
    }

    addPlayerToRaid(newPlayer, false);
    if (send) {
      message.message_type = "moveplayer";
      const oldPlayer: BuildPlayer = {
        id: newPlayer.id,
        name: newPlayer.name,
        class_name: newPlayer.class_name,
        alt: newPlayer.alt,
        main: newPlayer.main,
        group_id: newPlayer.group_id,
        race: newPlayer.race,
        status: newPlayer.status,
        spec: newPlayer.spec,
        raid: oldRaid
      };
      message.data = { player: newPlayer, build_id: newPlayer.raid, oldData: oldPlayer };
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const swapPlayer = (
    newPlayer: BuildPlayer,
    oldRaid: string,
    send: boolean = true,
    save: boolean = true
  ) => {
    const swappedCharacters: BuildPlayer[] = [];
    if (oldRaid === "roster") {
      const otherCharacters = raids
        .map((raid) => raid.players)
        .flat()
        .filter((player) => player.main === newPlayer.main);
      for (const character of otherCharacters) {
        if (
          (BuildHelper.isSameInstance(newPlayer, raids) &&
            BuildHelper.isSameLockout(newPlayer, raids)) ||
          character.raid === newPlayer.raid
        ) {
          removePlayerFromRaid(character, false, false, newPlayer.raid);
          swappedCharacters.push(character);
        }
      }
      addPlayerToRaid(newPlayer, false);
    } else {
      const currentPlayer = raids
        .map((raid) => raid.players)
        .flat()
        .find((player) => player.id === newPlayer.id);
      const otherCharacters = raids
        .map((raid) => raid.players)
        .flat()
        .filter((player) => player.main === newPlayer.main && player.id !== newPlayer.id);

      for (const character of otherCharacters) {
        if (currentPlayer) {
          removePlayerFromRaids(newPlayer, false, false);
          currentPlayer.raid = character.raid;
          addPlayerToRaid(currentPlayer, false);
        }
        if (character) {
          removePlayerFromRaids(character, false, false);
          character.raid = oldRaid;
          addPlayerToRaid(character, false);
          swappedCharacters.push(character);
        }
      }
    }
    if (newPlayer.raid !== "roster" && save) {
      saveBuild(getRaid(newPlayer.raid));
    }
    if (oldRaid !== "roster" && save) {
      saveBuild(getRaid(oldRaid));
    }

    if (send) {
      message.message_type = "swapplayer";
      message.data = {
        player: newPlayer,
        build_id: oldRaid,
        oldData: swappedCharacters
      };
      webSocket.sendMessage(JSON.stringify(message));
    }
  };

  const importPlayer = (
    newPlayer: BuildPlayer,
    ignoreErrors: boolean = false,
    oldRaid?: string,
    swap: boolean = false
  ): void => {
    if (newPlayer.group_id === "roster") {
      if (oldRaid === "roster") {
        return;
      }
      if (
        BuildHelper.isSameInstance(newPlayer, raids) &&
        BuildHelper.isSameLockout(newPlayer, raids)
      ) {
        removePlayerFromRaids(newPlayer);
      } else {
        removePlayerFromRaid(newPlayer, true, true, oldRaid);
      }
      saveBuild(getRaid(newPlayer.raid));
      return;
    }
    if (
      BuildHelper.isPlayerAbsent(newPlayer, getRaid(newPlayer.raid).date, absence) &&
      !ignoreErrors
    ) {
      handleModalOpen({
        title: common("error.player.import"),
        content: common("error.player.tentative"),
        params: { player: newPlayer.name, continue: newPlayer }
      });
      return;
    }
    if (newPlayer.status === InviteStatus.Declined && !ignoreErrors) {
      handleModalOpen({
        title: common("error.player.import"),
        content: common("error.player.declined"),
        params: { player: newPlayer.main, continue: newPlayer, swap: true, oldRaid: oldRaid }
      });
      return;
    }
    if (BuildHelper.hasCharacterInRaid(newPlayer, getRaid(newPlayer.raid)) && !ignoreErrors) {
      handleModalOpen({
        title: common("error.player.import"),
        content: common("error.player.exists"),
        params: { player: newPlayer.main, continue: newPlayer, swap: true, oldRaid: oldRaid }
      });
      return;
    }
    if (swap) {
      swapPlayer(newPlayer, oldRaid);
      return;
    }

    if (BuildHelper.isPlayerAlreadyInRaid(newPlayer, raids)) {
      updatePlayer(newPlayer);
      saveBuild(getRaid(newPlayer.raid));
      return;
    }

    if (
      BuildHelper.isPlayerMovedBetweenRaids(newPlayer, raids) &&
      BuildHelper.isSameInstance(newPlayer, raids) &&
      BuildHelper.isSameLockout(newPlayer, raids)
    ) {
      movePlayer(newPlayer, oldRaid);
      saveBuild(getRaid(newPlayer.raid));
      return;
    }
    addPlayerToRaid(newPlayer);
    saveBuild(getRaid(newPlayer.raid));
  };

  const loadAbsence = async (absenceResponse: Absence[], newRoster: BuildPlayer[]) => {
    for (const absenceItem of absenceResponse) {
      newRoster.map((player) => {
        if (player.id === absenceItem.player.id) {
          const newAbsence = {
            id: `${player.name}-${absenceItem.start_date}-${absenceItem.end_date}-${absenceItem.reason?.length}`,
            player,
            start_date: absenceItem.start_date,
            end_date: absenceItem.end_date,
            reason: absenceItem.reason,
            uid: absenceItem.uid
          } as Absence;
          if (!absence.find((currentAbsence) => currentAbsence.id === newAbsence.id)) {
            absence.push(newAbsence);
          }
        }
        return false;
      });
    }
  };

  const loadBuildNames = (buildData: Build[], activeRaids: Build[]) => {
    const buildObject: SelectOption[] = [];

    for (const build of buildData) {
      const buildSelect = {
        value: build.id,
        label: `${build.name} - ${new Date(build.date).toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}`,
        date: build.date
      };
      buildObject.push(buildSelect);
    }

    activeRaids.forEach((raid) => {
      const foundBuild = buildObject.find((build) => build.value === raid.id);
      if (foundBuild) {
        selectedBuilds[raid.build_id] = foundBuild;
      }
    });
    setSelectedBuilds(selectedBuilds);
    setBuildSelection(buildObject.sort((a, b) => b.date - a.date));
  };

  const loadBuilds = async (buildData: Build[], activeVersion: string = version) => {
    const versionInstances = Instance[activeVersion].map((instance) => instance.abbreviation);

    if (raids.length === 0) {
      raids.push(
        Instance[activeVersion].includes(buildData[buildData.length - 1].instance)
          ? buildData[buildData.length - 1] ?? getEmptyBuild()
          : getEmptyBuild(),
        Instance[activeVersion].includes(buildData[buildData.length - 2].instance)
          ? buildData[buildData.length - 2] ?? getEmptyBuild()
          : getEmptyBuild()
      );
    } else {
      raids[0] = Instance[activeVersion].includes(buildData[buildData.length - 1].instance)
        ? buildData[buildData.length - 1] ?? getEmptyBuild()
        : getEmptyBuild();
      raids[1] = Instance[activeVersion].includes(buildData[buildData.length - 2].instance)
        ? buildData[buildData.length - 2] ?? getEmptyBuild()
        : getEmptyBuild();
    }

    const versionBuilds = buildData
      .filter((build) => versionInstances.includes(build.instance))
      .sort((a, b) => a.date - b.date);

    for (let x = 0; x < MAX_RAIDS; x++) {
      const activeBuild = localStorage.getItem(`LastBuild-${x}`);

      if (activeBuild) {
        const foundBuild = versionBuilds.find((build) => build.id === activeBuild);
        if (foundBuild) {
          await BuildHelper.parseGetBuild(foundBuild.id).then((response) => {
            response.build_id = x;
            raids[x] = response;
          });
          continue;
        } else {
          if (versionBuilds) {
            const foundBuild = versionBuilds.pop();
            if (foundBuild) {
              await BuildHelper.parseGetBuild(foundBuild.id).then((response) => {
                response.build_id = x;
                raids[x] = response;
              });
              continue;
            }
          }
        }
      } else if (versionBuilds) {
        const foundBuild = versionBuilds.pop();
        if (foundBuild) {
          await BuildHelper.parseGetBuild(foundBuild.id).then((response) => {
            response.build_id = MAX_RAIDS - 1 - x;
            raids[MAX_RAIDS - 1 - x] = response;
          });
          continue;
        }
      }

      raids[MAX_RAIDS - 1 - x].build_id = MAX_RAIDS - 1 - x;
    }
    setRaids(raids);

    loadBuildNames(
      buildData
        .filter((build) => versionInstances.includes(build.instance))
        .sort((a, b) => a.date - b.date),
      raids
    );

    buildData.forEach((build) => {
      build.players = [];
    });
    setBuilds(buildData);
  };

  const updateRaidStatus = (
    currentRaids: Build[] = raids,
    currentRoster: BuildPlayer[] = roster,
    currentAbsences: Absence[] = absence
  ) => {
    currentRaids.map((raid) => {
      raid.players.map((buildPlayer) => {
        buildPlayer.status = InviteStatus.Unknown;

        currentAbsences.map((currentAbsence) => {
          if (currentAbsence.start_date <= raid.date && currentAbsence.end_date >= raid.date) {
            const absentPlayer = currentRoster.find(
              (rosterPlayer) => rosterPlayer.id === currentAbsence.player.id
            );
            if (absentPlayer) {
              currentRoster.map((rosterPlayer) => {
                if (BuildHelper.isAlt(absentPlayer, rosterPlayer)) {
                  if (rosterPlayer.id === buildPlayer.id) {
                    buildPlayer.status = InviteStatus.Tentative;
                  }
                }
                return false;
              });

              if (absentPlayer.id === buildPlayer.id) {
                buildPlayer.status = InviteStatus.Tentative;
              }
            }
          }
          return false;
        });
        return false;
      });
      return false;
    });
  };

  const updateRosterStatus = (
    currentRoster: BuildPlayer[] = roster,
    currentRaids: Build[] = raids,
    currentAbsences: Absence[] = absence,
    currentSelection: SelectOption[] = selectedBuilds
  ) => {
    const charactersSet = {};
    currentRoster.map((rosterPlayer) => {
      if (rosterPlayer.status !== InviteStatus.Benched) {
        rosterPlayer.status = InviteStatus.Unknown;
        return false;
      }

      currentSelection.map((build) => {
        currentAbsences.map((currentAbsence) => {
          if (currentAbsence.player.id === rosterPlayer.id) {
            if (
              currentAbsence.end_date >= build?.date ||
              currentAbsence.end_date >= new Date().getTime()
            ) {
              rosterPlayer.status = InviteStatus.Tentative;
            }
          }
          return false;
        });
        return false;
      });

      currentRaids.map((raid) => {
        raid?.players.map((raidPlayer) => {
          if (raidPlayer.id === rosterPlayer.id && rosterPlayer.status === InviteStatus.Unknown) {
            rosterPlayer.status = InviteStatus.Accepted;
            charactersSet[rosterPlayer.main] = charactersSet[rosterPlayer.main]
              ? charactersSet[rosterPlayer.main] + 1
              : 1;
          }
          return false;
        });
        return false;
      });
      if (charactersSet[rosterPlayer.main] >= MAX_SET_CHARACTERS) {
        currentRoster.map((otherRosterPlayer) => {
          if (
            BuildHelper.isAlt(otherRosterPlayer, rosterPlayer) ||
            otherRosterPlayer.name === rosterPlayer.name
          ) {
            if (otherRosterPlayer.status === InviteStatus.Unknown) {
              otherRosterPlayer.status = InviteStatus.Declined;
            }
          }
          return false;
        });
      }

      if (rosterPlayer.main !== rosterPlayer.name) {
        getMains(currentRoster).map((main) => {
          if (main.name === rosterPlayer.main && main.status === InviteStatus.Tentative) {
            rosterPlayer.status = InviteStatus.Tentative;
          }
          return false;
        });
      }

      return false;
    });
    setRoster([...currentRoster.sort(sortFunctions["DEFAULT"])]);
  };

  const loadData = async (data: Update) => {
    await loadBuilds(data.builds, version ?? "Wotlk");
    await loadAbsence(data.absences, data.players);
    setRoster(data.players.sort(sortFunctions["DEFAULT"]));
    updateRosterStatus(data.players);
    setIsLoading(false);
  };

  useEffect(() => {
    BuildHelper.parseGetUpdate()
      .then((update) => {
        loadData(update);
        setMaxRaidId(
          Math.max.apply(
            null,
            update.builds.map((build) => {
              return build?.raid_id;
            })
          )
        );
      })
      .catch(handleError);
    // eslint-disable-next-line
  }, [handleError]);

  useImperativeHandle(changeVersionRef, () => ({
    handleChangeVersion
  }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider
      value={{
        importPlayer,
        removePlayerFromRaid,
        resetBuild,
        getRaid,
        getBuilds,
        editPlayer,
        updateRoster,
        handleBuildSelect,
        handleDateSelect,
        getBuildSelections,
        addBuild,
        deleteBuild,
        getPlayerAbsence,
        setBuildInstance,
        getAbsentPlayers,
        getUnsetMains,
        removePlayerFromRaids,
        getAlts,
        getMains,
        getSelectedBuilds,
        getVersion,
        getAccountRole,
        deleteAbsence
      }}
    >
      <ModalAdd editPlayer={editPlayerModalFn} />
      <ModalAlert handleOpen={handleShowError} />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <ScrollingSidebar manager={manager} rosterRef={roster} />
        <div style={{ width: "100%", borderLeft: "1px solid black" }}>
          {raids.map((raid) => (
            <Raid
              key={UUID()}
              manager={manager}
              raidBuild={raid}
              builds={buildSelection}
              version={version}
            ></Raid>
          ))}
        </div>
      </div>
    </AppContextProvider>
  );
};

export default EditBuildPage;
