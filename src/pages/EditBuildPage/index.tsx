/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContextProvider } from "../../components/App/context";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import Roster from "../../components/Roster";
import {
  Absence,
  AbsenceData,
  Build,
  BuildData,
  BuildPlayer,
  PlayerData,
  SelectOption,
  Update,
  WebSocketMessage
} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import { Instance, InviteStatus } from "../../consts";
import { Button, Tooltip } from "@mui/material";
import cataclysm from "../../icons/Cata.png";
import wotlk from "../../icons/Wotlk.png";
import Raid from "../../components/Raid";
import ModalAlert from "../../components/ModalAlert";
import { sortFunctions } from "../../utils/sorting";
import StickyBox from "react-sticky-box";
import { Logout } from "@mui/icons-material";
import useWebSocket from "react-use-websocket";
import MessageBuild from "../../components/MessageBuild";
import envy from "../../icons/envy-ts-wenig-schatten.png";

export interface EditBuildPageProps {
  accountName: string;
  accountRole: number;
  logout: () => void;
  manager: any;
}

const EditBuildPage: FC<EditBuildPageProps> = ({ accountName, accountRole, logout, manager }) => {
  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [raids, setRaids] = useState<Build[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [sorting, setSorting] = useState("DEFAULT");
  const [buildSelection, setBuildSelection] = useState<SelectOption[]>([]);
  const [selectedBuilds, setSelectedBuilds] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState(localStorage.getItem("LastVersion") ?? "Wotlk");
  const [rosterExpanded, setRosterExpanded] = useState(false);
  const [absence, setAbsence] = useState<Absence[]>([]);
  const [maxRaidId, setMaxRaidId] = useState(0);
  const [socketUrl] = useState(process.env.REACT_APP_WEBSOCKET);
  const [socketId, setSocketId] = useState(UUID());
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    onMessage: (event: MessageEvent) => handleWebsocketUpdate(event),
    onOpen: (event: MessageEvent) => {
      setSocketId(UUID());
    },
    heartbeat: {
      message: "Ping",
      returnMessage: "Pong",
      timeout: 60000,
      interval: 60000
    },
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000)
  });

  const message = {
    socketId,
    message_type: "",
    data: {},
    account_name: accountName,
    date: new Date().getTime(),
    version: version
  };

  const _ = require("lodash");

  let openEditModal: any = () => {};
  let handleModalOpen: any = () => {};

  const MAX_SET_CHARACTERS = 2;
  const MESSAGES_TO_LOAD = 50;
  const MAX_RAIDS = 2;

  const updateRoster = (newPlayer: BuildPlayer, save?: boolean, send: boolean = true): void => {
    const oldPlayer = roster.find((player) => player.id === newPlayer.id);
    const newRoster = [...roster.filter((player) => player.id !== newPlayer.id), newPlayer].sort(
      sortFunctions[sorting]
    );
    updateRosterStatus(newRoster);
    if (save) {
      BuildHelper.parseSaveRoster(newRoster);
    }
    if (send) {
      message.message_type = "updateroster";
      message.data["player"] = newPlayer;
      message.data["oldData"] = oldPlayer;
      sendMessage(JSON.stringify(message));
    }
  };

  const removeFromRoster = (
    removedPlayer: BuildPlayer,
    save?: boolean,
    send: boolean = true
  ): void => {
    const newRoster = [
      ...roster.filter((player: BuildPlayer) => removedPlayer.id !== player.id)
    ].sort(sortFunctions[sorting]);

    newRoster.map((otherPlayer) => {
      if (otherPlayer.main === removedPlayer.name && otherPlayer.id !== removedPlayer.id) {
        otherPlayer.main = "";
      }
      return false;
    });
    setRoster(newRoster);
    if (save) {
      BuildHelper.parseDeleteRosterPlayer(removedPlayer);
    }
    if (send) {
      message.message_type = "removeroster";
      message.data["player"] = removedPlayer;
      sendMessage(JSON.stringify(message));
    }
  };

  const getSelectedBuilds = () => {
    return selectedBuilds ?? [];
  };

  const getCurrentSorting = () => {
    return sorting ?? "Alphabetical";
  };

  const getBuildSelections = () => {
    return buildSelection ?? [];
  };

  const getRosterExpanded = () => {
    return rosterExpanded;
  };

  const getRaid = (build_id: number): Build => {
    return raids[build_id] ?? getEmptyBuild();
  };

  const getBuilds = (): Build[] => {
    return builds;
  };

  const getVersion = (): string => {
    return version;
  };

  const getOtherRaids = (build_id: number): Build[] => {
    return raids.filter((build) => build?.id !== raids[build_id]?.id);
  };

  const getEmptyBuild = (game_version: string = version) => {
    return {
      id: UUID(),
      name: common("build.new"),
      date: new Date().setHours(0, 0, 0, 0),
      players: [],
      instance: Instance[game_version][0].abbreviation,
      build_id: -1
    } as Build;
  };

  const getBuildCopy = (build: Build): Build => {
    if (!build) {
      return getEmptyBuild();
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

  const hasCharacterInRaid = (character: BuildPlayer, build_id: number) => {
    if (raids[build_id].players.find((player) => isAlt(player, character))) {
      return true;
    }
    return false;
  };

  const isPlayerAbsent = (player: BuildPlayer, time: number): boolean => {
    for (const absentPlayer of absence) {
      if (absentPlayer.player.name === player.name || absentPlayer.player.name === player.main) {
        if (absentPlayer.start_date <= time && absentPlayer.end_date >= time) {
          return true;
        }
        continue;
      }
    }
    return false;
  };

  const isAlt = (potentialAlt: BuildPlayer, character: BuildPlayer): boolean => {
    if (
      potentialAlt.id !== character.id &&
      (potentialAlt.main === character.name || potentialAlt.main === character.main)
    ) {
      return true;
    }
    return false;
  };

  const getAlts = (player: BuildPlayer): BuildPlayer[] => {
    return roster.filter((rosterPlayer) => isAlt(rosterPlayer, player));
  };

  const getMains = (players: BuildPlayer[] = roster): BuildPlayer[] => {
    return players.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name;
    });
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

  const resetBuild = (build_id: number, send: boolean = true) => {
    const currentRaid = raids[build_id];
    const newBuild = getEmptyBuild();
    newBuild.name = currentRaid.name;
    newBuild.id = currentRaid.id;
    newBuild.raid_id = currentRaid.raid_id;
    raids[build_id] = newBuild;
    updateRaidStatus();
    updateRosterStatus();
    setRaids([...raids]);
    saveBuild(newBuild);
    if (send) {
      message.message_type = "resetbuild";
      message.data["build"] = newBuild;
      sendMessage(JSON.stringify(message));
    }
  };

  const handleSorting = (e: any) => {
    setSorting(e.target.value);
    setRoster([...roster].sort(sortFunctions[e.target.value]));
  };

  const handleChangeVersion = async () => {
    const newVersion = version === "Cataclysm" ? "Wotlk" : "Cataclysm";
    setVersion(newVersion);
    loadBuilds(builds, newVersion).then(() => {
      updateRosterStatus();
    });
    localStorage.setItem("LastVersion", newVersion);
  };

  const setBuildInstance = (build_id: number, value: any, send: boolean = true) => {
    const oldRaid = getBuildCopy(raids[build_id]);
    raids[build_id].instance = value.value ?? value;
    saveBuild(raids[build_id]);
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(raids[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldRaid;
      message.data["oldData"]["players"] = [];
      sendMessage(JSON.stringify(message));
    }
  };

  const handleBuildSelect = (build_id: number, value: any) => {
    localStorage.setItem(`LastBuild-${build_id}`, value.value ?? value);
    BuildHelper.parseGetBuild(value.value ?? value).then((build) => {
      build.build_id = build_id;
      raids[build_id] = build;
      selectedBuilds[build_id] = buildSelection.find(
        (buildSelect) => buildSelect.value === build.id
      );
      updateRaidStatus();
      updateRosterStatus();
    });
  };

  const handleDateSelect = (build_id: number, value: any, send: boolean = true) => {
    const oldRaid = getBuildCopy(raids[build_id]);
    raids[build_id].date = value.valueOf();
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
      return false;
    });
    updateRaidStatus();
    updateRosterStatus();
    saveBuild(raids[build_id]);
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(raids[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldRaid;
      message.data["oldData"]["players"] = [];
      sendMessage(JSON.stringify(message));
    }
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer) => {
    if (openEditModal) {
      openEditModal(player);
    }
  };

  const addBuild = async (
    name: string,
    build_id: number,
    save?: boolean,
    send: boolean = true,
    oldId?: string
  ) => {
    const newBuild = getEmptyBuild();
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
      sendMessage(JSON.stringify(message));
    }
  };

  const deleteBuild = async (id: string, send: boolean = true) => {
    const oldRaid = raids.find((raid) => raid.id === id);
    const newBuilds = [...buildSelection.filter((build) => build.value !== oldRaid.id)];
    setBuildSelection([...newBuilds].sort((a, b) => b.date - a.date));

    const buildIsSet = selectedBuilds.find((selectedBuild) => selectedBuild.value === id);
    if (buildIsSet) {
      const newBuild = getEmptyBuild();
      newBuild.build_id = oldRaid.build_id;
      raids[oldRaid.build_id] = newBuild;
      selectedBuilds[oldRaid.build_id] = { value: newBuild.id, label: newBuild.name };
      localStorage.removeItem(`LastBuild-${oldRaid.build_id}`);
    }
    updateRosterStatus();
    setBuilds([...builds.filter((build) => build.id !== id)]);
    BuildHelper.parseDeleteBuild(oldRaid.id);
    if (send) {
      message.message_type = "deletebuild";
      message.data["build"] = oldRaid;
      sendMessage(JSON.stringify(message));
    }
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

  const getAbsentPlayers = (build_id: number, raid?: Build): BuildPlayer[] => {
    const playerBuild = raids[build_id] ?? raid;
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

  const getUnsetMains = (build_id: number): BuildPlayer[] => {
    const mains = roster.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name;
    });
    const setMains: BuildPlayer[] = [];
    mains.forEach((main) => {
      raids.forEach((raid) => {
        if (raid?.build_id === build_id) {
          raid?.players.forEach((player) => {
            if (isAlt(player, main) || player.name === main.name) {
              setMains.push(main);
            }
          });
        }
      });
    });
    const unsetMains = [];
    mains.forEach((main) => {
      if (!setMains.includes(main)) {
        if (main.alt !== undefined && main.alt !== "None") {
          unsetMains.push(roster.find((rosterPlayer) => rosterPlayer.name === main.alt));
        } else {
          unsetMains.push(main);
        }
      }
    });
    return unsetMains;
  };

  const isPlayerAlreadyInRaid = (player: BuildPlayer): boolean => {
    const playerRaid = raids.find((build) => {
      return build.build_id === player.raid;
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
  };

  const isPlayerMovedBetweenRaids = (player: BuildPlayer): boolean => {
    const otherRaids = getOtherRaids(player.raid);
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
  };

  const isSameInstance = (player: BuildPlayer): boolean => {
    const otherRaids = raids.filter((raid) => {
      return raid.id !== raids[player.raid]?.id;
    });
    const sameInstance = otherRaids.find(
      (otherRaid) => otherRaid.instance === raids[player.raid]?.instance
    );
    if (sameInstance) {
      return true;
    }
    return false;
  };

  const isSameLockout = (player: BuildPlayer): boolean => {
    const currentDate = new Date();
    const otherRaids = raids.filter((raid) => {
      return raid.id !== raids[player.raid].id;
    });
    // Get the next reset time
    currentDate.setDate(currentDate.getDate() + ((3 + 7 - currentDate.getDay()) % 7 || 7));
    currentDate.setHours(0, 0, 0, 0);
    const sameLockout = otherRaids.find((otherBuild) => {
      return (
        new Date(raids[player.raid].date).setHours(0, 0, 0, 0) - currentDate.getTime() < 0 &&
        new Date(otherBuild.date).setHours(0, 0, 0, 0) - currentDate.getTime() < 0
      );
    });
    if (sameLockout) {
      return true;
    }
    return false;
  };

  const addPlayerToRaid = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentRaid = raids[newPlayer.raid];
    currentRaid.players = [...currentRaid.players, newPlayer];

    raids[newPlayer.raid] = currentRaid;
    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);
    if (send) {
      message.message_type = "addplayer";
      message.data = { player: newPlayer, build_id: currentRaid.id };
      sendMessage(JSON.stringify(message));
    }
  };

  const updatePlayer = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentRaid = raids[newPlayer.raid];
    const oldPlayer = currentRaid.players.find((player) => player.id === newPlayer.id);
    const otherPlayers = currentRaid.players.filter((player) => {
      return player.id !== newPlayer.id;
    });
    currentRaid.players = [...otherPlayers, newPlayer];

    raids[newPlayer.raid] = currentRaid;
    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);
    if (send) {
      message.message_type = "updateplayer";
      message.data = { player: newPlayer, build_id: currentRaid.id, oldData: oldPlayer };
      sendMessage(JSON.stringify(message));
    }
  };

  const removePlayerFromRaids = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true
  ): void => {
    raids.forEach((raid) => {
      removePlayerFromRaid(newPlayer, save, send, raid.build_id);
    });
  };

  const removePlayerFromRaid = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true,
    oldRaid?: number
  ): void => {
    const currentRaid = getBuildCopy(raids[oldRaid ?? newPlayer.raid]);
    const newPlayers = currentRaid.players.filter((player) => {
      return player.id !== newPlayer.id;
    });
    currentRaid.players = [...newPlayers];

    raids[oldRaid ?? newPlayer.raid] = currentRaid;
    updateRosterStatus();
    updateRaidStatus();
    setRaids([...raids]);

    if (save) {
      saveBuild(currentRaid);
    }
    if (send) {
      message.message_type = "removeplayer";
      const newPlayerCopy: BuildPlayer = {
        id: newPlayer.id,
        name: newPlayer.name,
        class_name: newPlayer.class_name,
        alt: newPlayer.alt,
        main: newPlayer.main,
        oldName: newPlayer.oldName,
        group_id: newPlayer.group_id,
        race: newPlayer.race,
        status: newPlayer.status,
        spec: newPlayer.spec,
        raid: oldRaid ?? newPlayer.raid
      };
      message.data = { player: newPlayerCopy, build_id: currentRaid.id };
      sendMessage(JSON.stringify(message));
    }
  };

  const movePlayer = (newPlayer: BuildPlayer, oldRaid?: number, send: boolean = true): void => {
    removePlayerFromRaid(newPlayer, false, false, oldRaid);
    addPlayerToRaid(newPlayer, false);
    const currentRaid = getBuildCopy(raids[oldRaid ?? newPlayer.raid]);
    if (send) {
      message.message_type = "moveplayer";
      const oldPlayer: BuildPlayer = {
        id: newPlayer.id,
        name: newPlayer.name,
        class_name: newPlayer.class_name,
        alt: newPlayer.alt,
        main: newPlayer.main,
        oldName: newPlayer.oldName,
        group_id: newPlayer.group_id,
        race: newPlayer.race,
        status: newPlayer.status,
        spec: newPlayer.spec,
        raid: oldRaid
      };
      message.data = { player: newPlayer, build_id: currentRaid.id, oldData: oldPlayer };
      sendMessage(JSON.stringify(message));
    }
  };

  const importPlayer = (
    newPlayer: BuildPlayer,
    ignoreErrors: boolean = false,
    oldRaid?: number
  ): void => {
    if (newPlayer.group_id === "roster") {
      if (newPlayer.raid === -1) {
        return;
      }
      if (isSameInstance(newPlayer) && isSameLockout(newPlayer)) {
        removePlayerFromRaids(newPlayer);
      } else {
        newPlayer.raid = oldRaid;
        removePlayerFromRaid(newPlayer);
      }
      saveBuild(raids[newPlayer.raid]);
      return;
    }
    if (isPlayerAbsent(newPlayer, raids[newPlayer.raid].date) && !ignoreErrors) {
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
        params: { player: newPlayer.main, continue: newPlayer }
      });
      return;
    }

    if (hasCharacterInRaid(newPlayer, newPlayer.raid) && !ignoreErrors) {
      handleModalOpen({
        title: common("error.player.import"),
        content: common("error.player.exists"),
        params: { player: newPlayer.main, continue: newPlayer }
      });
      return;
    }

    if (isPlayerAlreadyInRaid(newPlayer)) {
      updatePlayer(newPlayer);
      saveBuild(raids[newPlayer.raid]);
      return;
    }

    if (
      isPlayerMovedBetweenRaids(newPlayer) &&
      isSameInstance(newPlayer) &&
      isSameLockout(newPlayer)
    ) {
      movePlayer(newPlayer, oldRaid);
      saveBuild(raids[newPlayer.raid]);
      return;
    }

    addPlayerToRaid(newPlayer);
    saveBuild(raids[newPlayer.raid]);
  };

  const loadAbsence = async (absenceResponse: Absence[], newRoster: BuildPlayer[]) => {
    for (const absenceItem of absenceResponse) {
      newRoster.map((player) => {
        if (player.id === absenceItem.player.id) {
          const newAbsence = {
            id: `${player.name}${absenceItem.start_date}${absenceItem.end_date}${absenceItem.reason?.length}`,
            player,
            start_date: absenceItem.start_date,
            end_date: absenceItem.end_date,
            reason: absenceItem.reason
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

  const loadBuilds = async (buildData: Build[], activeVersion?: string) => {
    const versionInstances = Instance[activeVersion ?? version].map(
      (instance) => instance.abbreviation
    );

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
      raids[MAX_RAIDS - 1 - x] = getEmptyBuild(activeVersion);
      raids[MAX_RAIDS - 1 - x].build_id = MAX_RAIDS - 1 - x;
    }

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
                if (isAlt(absentPlayer, rosterPlayer)) {
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
      rosterPlayer.status = InviteStatus.Unknown;

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
            isAlt(otherRosterPlayer, rosterPlayer) ||
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
    setRoster([...currentRoster.sort(sortFunctions[sorting])]);
  };

  const loadData = async (data: Update) => {
    const currentBuildIds = builds.map((build) => build?.id);

    const differencesBuilds = _.differenceWith(
      data.builds.filter((build) => currentBuildIds.includes(build?.id)),
      builds,
      (a: Build[], b: Build[]) => {
        return _.isEqual(
          _.omit(a, ["raid_id", "build_id", "id"]),
          _.omit(b, ["raid_id", "build_id", "id"])
        );
      }
    );
    if (differencesBuilds.length > 0 || isLoading) {
      console.log("Builds have changed. Reloading");
      await loadBuilds(data.builds);
    }

    const newAbsence = data.absences.filter((absencePlayer) => {
      return (
        roster.find((rosterPlayer) => {
          return rosterPlayer.id === absencePlayer.player.id;
        }) !== undefined
      );
    });
    if (newAbsence.length !== absence.length || isLoading) {
      console.log("Absences have changed. Reloading");
      await loadAbsence(data.absences, data.players);
    }

    const differencesRoster = _.differenceWith(
      data.players,
      roster,
      (a: BuildPlayer[], b: BuildPlayer[]) => {
        return _.isEqual(
          _.omit(a, ["group_id", "id", "raid", "status", "oldName"]),
          _.omit(b, ["group_id", "id", "raid", "status", "oldName"])
        );
      }
    );
    if (differencesRoster.length > 0 || data.players.length !== roster.length) {
      console.log("Roster has changed. Reloading");
      setRoster(data.players.sort(sortFunctions[sorting]));
      updateRosterStatus(data.players);
    }
  };

  const handleWebsocketUpdate = (event: MessageEvent<any>) => {
    if (event.data === "Pong") {
      return;
    }
    const received_message: WebSocketMessage = JSON.parse(event.data);
    if (!["update"].includes(received_message.message_type)) {
      const newMessage = BuildHelper.parseMessage(received_message, builds, roster);
      setMessageHistory([newMessage, ...messageHistory]);
    }
    if (received_message.socketId === socketId) {
      return;
    }
    switch (received_message.message_type) {
      case "addplayer": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) => selectedBuild?.value === data.build_id
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = selectedBuilds.indexOf(foundBuild);
          addPlayerToRaid(data.player, false);
        }
        break;
      }
      case "updateplayer": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) => selectedBuild?.value === data.build_id
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = selectedBuilds.indexOf(foundBuild);
          updatePlayer(data.player, false);
        }
        break;
      }
      case "removeplayer": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) => selectedBuild?.value === data.build_id
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = selectedBuilds.indexOf(foundBuild);
          removePlayerFromRaid(data.player, false, false);
        }
        break;
      }
      case "moveplayer": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) => selectedBuild?.value === data.build_id
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = selectedBuilds.indexOf(foundBuild);
          movePlayer(data.player, data.oldData?.raid, false);
        }
        break;
      }
      case "addbuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = builds.find((build) => build?.id === data.build.id);
        if (!foundBuild) {
          addBuild(data.build.name, data.build.build_id, false, false, data.build.id);
        }
        break;
      }
      case "deletebuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = builds.find((build) => build?.id === data.build.id);
        if (foundBuild) {
          deleteBuild(foundBuild.id, false);
        } else {
          setBuildSelection(buildSelection.filter((build) => build.value !== data.build.id));
        }
        break;
      }
      case "resetbuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = selectedBuilds.find((build) => build.value === data.build.id);
        if (foundBuild) {
          resetBuild(selectedBuilds.indexOf(foundBuild), false);
        }
        break;
      }
      case "updatebuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = selectedBuilds.find((build) => build.value === data.build.id);
        if (foundBuild) {
          if (foundBuild.date !== data.build.date) {
            handleDateSelect(
              raids[selectedBuilds.indexOf(foundBuild)].build_id,
              data.build.date,
              false
            );
          }
          if (raids[selectedBuilds.indexOf(foundBuild)].instance !== data.build.instance) {
            setBuildInstance(
              raids[selectedBuilds.indexOf(foundBuild)].build_id,
              data.build.instance,
              false
            );
          }
        }
        const foundBuildSelection = buildSelection.find((build) => build.value === data.build.id);
        if (foundBuildSelection) {
          foundBuildSelection.date = data.build.date;
          foundBuildSelection.label = `${data.build.name} - ${new Date(
            data.build.date
          ).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}`;
        }
        break;
      }
      case "updateroster": {
        const data: PlayerData = received_message.data as PlayerData;
        if (data) {
          updateRoster(data.player, false, false);
        }
        break;
      }
      case "removeroster": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        if (foundPlayer) {
          removeFromRoster(data.player, false, false);
        }
        break;
      }
      case "absence": {
        const data: AbsenceData = received_message.data as AbsenceData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player_id);
        if (foundPlayer) {
          const newAbsence = {
            id: `${foundPlayer.name}${data.start_date}${data.end_date}${data.reason?.length}`,
            player: foundPlayer,
            start_date: data.start_date,
            end_date: data.end_date,
            reason: data.reason
          } as Absence;
          setAbsence([...absence, newAbsence]);
          updateRaidStatus(raids, roster, [...absence, newAbsence]);
          updateRosterStatus(roster, raids, [...absence, newAbsence]);
        }
        break;
      }
      case "update":
        if (!isLoading) {
          return;
        }
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
            BuildHelper.parseGetMessages(MESSAGES_TO_LOAD, update.builds, update.players).then(
              (messages) => {
                setMessageHistory(messages.sort((a, b) => b.date - a.date));
                setIsLoading(false);
              }
            );
          })
          .catch(handleError);
        break;
      default:
        console.log(`No method implemented for ${received_message.message_type}`);
        break;
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
  }, [
    handleError,
    isLoading,
    builds,
    roster,
    absence,
    buildSelection,
    selectedBuilds,
    version,
    raids
  ]);

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
        removeFromRoster,
        handleSorting,
        getCurrentSorting,
        handleBuildSelect,
        handleDateSelect,
        getBuildSelections,
        addBuild,
        deleteBuild,
        setRosterExpanded,
        getRosterExpanded,
        getPlayerAbsence,
        setBuildInstance,
        getAbsentPlayers,
        getUnsetMains,
        removePlayerFromRaids,
        getAlts,
        getMains,
        getSelectedBuilds,
        getVersion
      }}
    >
      <ModalAdd editPlayer={editPlayerModalFn} accountRole={accountRole} />
      <ModalAlert handleOpen={handleShowError} />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <StickyBox
          style={{
            width: "40%",
            borderBottom: `1px solid black`,
            borderRight: "1px solid black",
            marginRight: "30px"
          }}
        >
          <Roster manager={manager} players={roster} editing accountRole={accountRole} />
          <Box
            display={"grid"}
            sx={{
              background: "#1d1d1d",
              backgroundImage: `url(${envy})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom right",
              backgroundSize: "15%"
            }}
            justifySelf={"center"}
          >
            <MessageBuild messages={messageHistory} accountRole={accountRole}></MessageBuild>
            <Tooltip title={common(`logout`)}>
              <Button
                sx={{
                  marginBottom: "56px",
                  height: "100%",
                  display: "grid",
                  gridTemplateColumns: "4fr fr",
                  justifyContent: "center",
                  marginTop: "-1px",
                  borderTop: "1px solid black"
                }}
                onClick={logout}
              >
                <Box>{`Currently logged in as ${accountName}`}</Box>
                <Box>
                  <Logout />
                </Box>
              </Button>
            </Tooltip>
          </Box>
        </StickyBox>
        <div style={{ width: "100%", borderLeft: "1px solid black" }}>
          <Raid
            manager={manager}
            id={0}
            raidBuild={raids.find((raid) => raid?.build_id === 0) ?? raids[0]}
            builds={buildSelection}
            selectedBuild={selectedBuilds[0]}
            version={version}
            editing
            accountRole={accountRole}
          ></Raid>
          <Raid
            manager={manager}
            id={1}
            raidBuild={raids.find((raid) => raid?.build_id === 1) ?? raids[1]}
            builds={buildSelection}
            selectedBuild={selectedBuilds[1]}
            version={version}
            editing
            accountRole={accountRole}
          ></Raid>
          <br></br>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              style={{ width: "250px", height: "150px" }}
              key={UUID()}
              onClick={handleChangeVersion}
            >
              <Tooltip title={common(`version.${version}`)}>
                <img
                  width={"250"}
                  height={"150"}
                  alt={common(`version.${version}`)}
                  src={version === "Cataclysm" ? cataclysm : wotlk}
                ></img>
              </Tooltip>
            </Button>
          </Box>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default EditBuildPage;
