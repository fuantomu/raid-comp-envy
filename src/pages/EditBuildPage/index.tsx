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
import { Instance, InviteStatus, accountRoleTimeouts } from "../../consts";
import { Button, Tooltip } from "@mui/material";
import cataclysm from "../../icons/Cataclysmlogo.webp";
import wotlk from "../../icons/WrathLogo.webp";
import { createDragDropManager } from "dnd-core";
import Raid from "../../components/Raid";
import { HTML5Backend } from "react-dnd-html5-backend";
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
  issueTime: number;
}

const EditBuildPage: FC<EditBuildPageProps> = ({ accountName, accountRole, logout, issueTime }) => {
  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [sorting, setSorting] = useState("DEFAULT");
  const [buildSelection, setBuildSelection] = useState<SelectOption[]>([]);
  const [selectedBuilds, setSelectedBuilds] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState(localStorage.getItem("LastVersion") ?? "Wotlk");
  const [rosterExpanded, setRosterExpanded] = useState(false);
  const [absence, setAbsence] = useState<Absence[]>([]);
  const [logoutTime, setLogoutTime] = useState(0);
  const [maxRaidId, setMaxRaidId] = useState(0);
  const [socketUrl] = useState(process.env.REACT_APP_WEBSOCKET);
  const [socketId, setSocketId] = useState(UUID());
  const [messageHistory, setMessageHistory] = useState([]);
  const manager = createDragDropManager(HTML5Backend);

  const { sendMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: MessageEvent) => handleWebsocketUpdate(event),
    onOpen: (event: MessageEvent) => {
      setSocketId(UUID());
    },
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000)
  });

  const message = {
    socketId,
    message_type: "",
    data: {},
    account_name: accountName,
    date: new Date().getTime()
  };

  const _ = require("lodash");

  let openEditModal: any = () => {};
  let handleModalOpen: any = () => {};

  const MAX_SET_CHARACTERS = 2;
  const MESSAGES_TO_LOAD = 50;

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
    return selectedBuilds;
  };

  const getCurrentSorting = () => {
    return sorting ?? "Alphabetical";
  };

  const getBuilds = () => {
    return buildSelection;
  };

  const getRosterExpanded = () => {
    return rosterExpanded;
  };

  const setBuildInstance = (build_id: number, value: any, send: boolean = true) => {
    const oldBuild = getBuildCopy(builds[build_id]);
    builds[build_id].instance = value.value ?? value;
    updateRosterStatus();
    saveBuild(builds[build_id]);
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(builds[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldBuild;
      message.data["oldData"]["players"] = [];
      sendMessage(JSON.stringify(message));
    }
  };

  const getBuild = (build_id: number): Build => {
    return builds[build_id];
  };

  const getOtherBuilds = (build_id: number): Build[] => {
    return builds.filter((build) => build?.id !== builds[build_id]?.id);
  };

  const getEmptyBuild = () => {
    return {
      id: UUID(),
      name: common("build.new"),
      date: new Date().setHours(0, 0, 0, 0),
      players: [],
      instance:
        version === "Cataclysm"
          ? Instance.Cataclysm[0].abbreviation
          : Instance.Wotlk[0].abbreviation,
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
    if (builds[build_id].players.find((player) => isAlt(player, character))) {
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

  const getMains = (): BuildPlayer[] => {
    return roster.filter((rosterPlayer) => {
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
    const currentBuild = builds[build_id];
    const newBuild = getEmptyBuild();
    newBuild.name = currentBuild.name;
    newBuild.id = currentBuild.id;
    newBuild.raid_id = currentBuild.raid_id;
    builds[build_id] = newBuild;
    updateBuildStatus();
    updateRosterStatus(roster, builds);
    setBuilds([...builds]);
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

  const handleChangeVersion = () => {
    const newVersion = version === "Cataclysm" ? "Wotlk" : "Cataclysm";
    setVersion(newVersion);
    localStorage.setItem("LastVersion", newVersion);
  };

  const handleBuildSelect = (build_id: number, value: any) => {
    localStorage.setItem(`LastBuild-${build_id}`, value.value);
    BuildHelper.parseGetBuild(value.value).then((build) => {
      build.build_id = build_id;
      builds[build_id] = build;
      updateBuildStatus();
      updateRosterStatus();
      selectedBuilds[build_id] = buildSelection.find(
        (buildSelect) => buildSelect.value === build.id
      );
    });
  };

  const handleDateSelect = (build_id: number, value: any, send: boolean = true) => {
    const oldBuild = getBuildCopy(builds[build_id]);
    builds[build_id].date = value.valueOf();
    updateBuildStatus();
    updateRosterStatus();
    saveBuild(builds[build_id]);
    buildSelection.map((buildSelect) => {
      if (buildSelect.value === builds[build_id].id) {
        buildSelect.date = value.valueOf();
        buildSelect.label = `${builds[build_id].name} - ${new Date(value.valueOf()).toLocaleString(
          "de-DE",
          { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
        )}`;
        selectedBuilds[build_id].label = buildSelect.label;
        selectedBuilds[build_id].date = value.valueOf();
      }
      return false;
    });
    if (send) {
      message.message_type = "updatebuild";
      message.data["build"] = getBuildCopy(builds[build_id]);
      message.data["build"]["players"] = [];
      message.data["oldData"] = oldBuild;
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
    build: string,
    build_id: number,
    save?: boolean,
    send: boolean = true,
    oldId?: string
  ) => {
    const newBuild = getEmptyBuild();
    newBuild.name = build;
    newBuild.build_id = build_id;
    newBuild.raid_id = maxRaidId + 1;
    if (oldId) {
      newBuild.id = oldId;
    }
    setMaxRaidId(maxRaidId + 1);

    const newBuildSelect = {
      value: newBuild.id,
      label: `${build} - ${new Date(new Date().setHours(0, 0, 0)).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })}`,
      date: new Date().setHours(0, 0, 0)
    };
    setBuildSelection([...buildSelection, newBuildSelect].sort((a, b) => b.date - a.date));
    setBuilds([...builds]);
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
    const oldBuild = builds.find((build) => build.id === id);
    const newBuilds = [...buildSelection.filter((build) => build.value !== oldBuild.id)];
    setBuildSelection([...newBuilds].sort((a, b) => b.date - a.date));

    const buildIsSet = selectedBuilds.find((selectedBuild) => selectedBuild.value === id);
    if (buildIsSet) {
      const newBuild = getEmptyBuild();
      newBuild.build_id = oldBuild.build_id;
      builds[oldBuild.build_id] = newBuild;
      selectedBuilds[oldBuild.build_id] = { value: newBuild.id, label: newBuild.name };
      localStorage.removeItem(`LastBuild-${oldBuild.build_id}`);
    }
    updateRosterStatus();
    setBuilds([...builds.filter((build) => build.id !== id)]);
    BuildHelper.parseDeleteBuild(oldBuild.id);
    if (send) {
      message.message_type = "deletebuild";
      message.data["build"] = oldBuild;
      sendMessage(JSON.stringify(message));
    }
  };

  const handleShowError = (callback: any) => {
    handleModalOpen = callback;
  };

  const getPlayerAbsence = (player: string, build?: Build | undefined) => {
    if (!build) {
      build = builds[0];
    }
    return absence.filter(
      (absentPlayer) =>
        (absentPlayer.player.name === player || absentPlayer.player.main === player) &&
        absentPlayer.end_date >= build?.date
    );
  };

  const getAbsentPlayers = (build_id: number): BuildPlayer[] => {
    const playerBuild = builds[build_id];
    const foundPlayers = roster.filter((player: BuildPlayer) => {
      const playerAbsence = getPlayerAbsence(player.main ?? player.name, playerBuild);
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
      builds.forEach((build) => {
        if (build?.build_id === build_id) {
          build?.players.forEach((player) => {
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
        if (main.alt) {
          unsetMains.push(roster.find((rosterPlayer) => rosterPlayer.name === main.alt));
        } else {
          unsetMains.push(main);
        }
      }
    });
    return unsetMains;
  };

  const isPlayerAlreadyInRaid = (player: BuildPlayer): boolean => {
    const playerRaid = builds.find((build) => {
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
    const otherRaids = getOtherBuilds(player.raid);
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
    const otherBuilds = builds.filter((build) => {
      return build.id !== builds[player.raid]?.id;
    });
    const sameInstance = otherBuilds.find(
      (otherBuild) => otherBuild.instance === builds[player.raid]?.instance
    );
    if (sameInstance) {
      return true;
    }
    return false;
  };

  const isSameLockout = (player: BuildPlayer): boolean => {
    const currentDate = new Date();
    const otherBuilds = builds.filter((build) => {
      return build.id !== builds[player.raid].id;
    });
    // Get the next reset time
    currentDate.setDate(currentDate.getDate() + ((3 + 7 - currentDate.getDay()) % 7 || 7));
    currentDate.setHours(0, 0, 0, 0);
    const sameLockout = otherBuilds.find((otherBuild) => {
      return (
        new Date(builds[player.raid].date).setHours(0, 0, 0, 0) - currentDate.getTime() < 0 &&
        new Date(otherBuild.date).setHours(0, 0, 0, 0) - currentDate.getTime() < 0
      );
    });
    if (sameLockout) {
      return true;
    }
    return false;
  };

  const addPlayerToRaid = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentBuild = builds[newPlayer.raid];
    currentBuild.players = [...currentBuild.players, newPlayer];

    builds[newPlayer.raid] = currentBuild;
    updateRosterStatus();
    updateBuildStatus();
    setBuilds([...builds]);
    if (send) {
      message.message_type = "addplayer";
      message.data = { player: newPlayer, build_id: currentBuild.id };
      sendMessage(JSON.stringify(message));
    }
  };

  const updatePlayer = (newPlayer: BuildPlayer, send: boolean = true): void => {
    const currentBuild = builds[newPlayer.raid];
    const oldPlayer = currentBuild.players.find((player) => player.id === newPlayer.id);
    const otherPlayers = currentBuild.players.filter((player) => {
      return player.id !== newPlayer.id;
    });
    currentBuild.players = [...otherPlayers, newPlayer];

    builds[newPlayer.raid] = currentBuild;
    updateRosterStatus();
    updateBuildStatus();
    setBuilds([...builds]);
    if (send) {
      message.message_type = "updateplayer";
      message.data = { player: newPlayer, build_id: currentBuild.id, oldData: oldPlayer };
      sendMessage(JSON.stringify(message));
    }
  };

  const removePlayerFromRaids = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true
  ): void => {
    builds.forEach((build) => {
      removePlayerFromRaid(newPlayer, save, send, build.build_id);
    });
  };

  const removePlayerFromRaid = (
    newPlayer: BuildPlayer,
    save: boolean = false,
    send: boolean = true,
    oldBuild?: number
  ): void => {
    const currentBuild = getBuildCopy(builds[oldBuild ?? newPlayer.raid]);
    const newPlayers = currentBuild.players.filter((player) => {
      return player.id !== newPlayer.id;
    });
    currentBuild.players = [...newPlayers];

    builds[oldBuild ?? newPlayer.raid] = currentBuild;
    updateRosterStatus(roster, builds, absence);
    updateBuildStatus();
    setBuilds([...builds]);

    if (save) {
      saveBuild(currentBuild);
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
        raid: oldBuild ?? newPlayer.raid
      };
      message.data = { player: newPlayerCopy, build_id: currentBuild.id };
      sendMessage(JSON.stringify(message));
    }
  };

  const importPlayer = (
    newPlayer: BuildPlayer,
    ignoreErrors: boolean = false,
    oldBuild?: number
  ): void => {
    if (newPlayer.group_id === "roster") {
      if (newPlayer.raid === -1) {
        return;
      }
      if (isSameInstance(newPlayer) && isSameLockout(newPlayer)) {
        removePlayerFromRaids(newPlayer);
      } else {
        newPlayer.raid = oldBuild;
        removePlayerFromRaid(newPlayer);
      }
      saveBuild(builds[newPlayer.raid]);
      return;
    }
    if (isPlayerAbsent(newPlayer, builds[newPlayer.raid].date) && !ignoreErrors) {
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
      saveBuild(builds[newPlayer.raid]);
      return;
    }

    if (
      isPlayerMovedBetweenRaids(newPlayer) &&
      isSameInstance(newPlayer) &&
      isSameLockout(newPlayer)
    ) {
      removePlayerFromRaid(newPlayer, false, true, oldBuild);
      addPlayerToRaid(newPlayer);
      saveBuild(builds[newPlayer.raid]);
      return;
    }

    addPlayerToRaid(newPlayer);
    saveBuild(builds[newPlayer.raid]);
  };

  const loadAbsence = (absenceResponse: Absence[], newRoster: BuildPlayer[]) => {
    const absenceObject: Absence[] = [];
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
          if (!absenceObject.find((currentAbsence) => currentAbsence.id === newAbsence.id)) {
            absenceObject.push(newAbsence);
          }
        }
        return false;
      });
    }
    setAbsence(absenceObject);
  };

  const loadBuildNames = (buildData: Build[]) => {
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
      if (build.build_id in [0, 1]) {
        selectedBuilds[build.build_id] = buildSelect;
      }
      buildObject.push(buildSelect);
    }
    setSelectedBuilds(selectedBuilds);
    setBuildSelection(buildObject.sort((a, b) => b.date - a.date));
  };

  const loadBuilds = (buildData: Build[]) => {
    const initialBuilds = [];
    const newestBuilds = buildData.sort((a, b) => b.date - a.date);
    if (builds.length === 0) {
      initialBuilds.push(...[getEmptyBuild(), getEmptyBuild()]);
      if (buildData.length > 1) {
        const foundBuild = buildData.find((build) => {
          if (localStorage.getItem("LastBuild-0")) {
            return build.id === localStorage.getItem("LastBuild-0");
          } else {
            return build.id === newestBuilds[1].id;
          }
        });
        console.log(foundBuild);
        if (foundBuild) {
          initialBuilds[0] = foundBuild;
        }
        initialBuilds[0].build_id = 0;
      }
      if (buildData.length > 0) {
        const foundBuild = buildData.find((build) => {
          if (localStorage.getItem("LastBuild-1")) {
            return build.id === localStorage.getItem("LastBuild-1");
          } else {
            return build.id === newestBuilds[0].id;
          }
        });
        if (foundBuild) {
          initialBuilds[1] = foundBuild;
        }
        initialBuilds[1].build_id = 1;
      }
    } else {
      const currentBuilds = builds.map((build) => {
        return { id: build.id, build_id: build.build_id };
      });
      buildData.forEach((build) => {
        const isCurrentBuild = currentBuilds.find((currentBuild) => {
          return currentBuild?.id === build?.id;
        });
        if (isCurrentBuild) {
          build.build_id = isCurrentBuild.build_id;
          initialBuilds.push(build);
        }
      });
    }
    initialBuilds.forEach((initialBuild) => {
      if (initialBuild.name === "New Build") {
        const old_build_id = initialBuild.build_id;
        initialBuild =
          newestBuilds[newestBuilds.length - 1 - initialBuild.build_id] ?? getEmptyBuild();
        initialBuild.build_id = old_build_id;
      }
      console.log(initialBuild);
      builds[initialBuild.build_id] = initialBuild;
    });
    setBuilds([...builds]);
  };

  const updateBuildStatus = (
    currentBuilds: Build[] = builds,
    currentRoster: BuildPlayer[] = roster,
    currentAbsences: Absence[] = absence
  ) => {
    currentBuilds.map((build) => {
      build?.players.map((buildPlayer) => {
        buildPlayer.status = InviteStatus.Unknown;
        currentAbsences.map((currentAbsence) => {
          if (currentAbsence.start_date <= build.date && currentAbsence.end_date >= build.date) {
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
    currentBuilds: Build[] = builds,
    currentAbsences: Absence[] = absence
  ) => {
    const charactersSet = {};
    currentRoster.map((rosterPlayer) => {
      rosterPlayer.status = InviteStatus.Unknown;

      currentBuilds.map((build) => {
        currentAbsences.map((currentAbsence) => {
          if (currentAbsence.end_date >= build?.date) {
            if (currentAbsence.player.id === rosterPlayer.id) {
              rosterPlayer.status = InviteStatus.Tentative;
            }
          }
          return false;
        });
        build?.players.map((buildPlayer) => {
          if (buildPlayer.id === rosterPlayer.id && rosterPlayer.status === InviteStatus.Unknown) {
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

      currentRoster.map((otherRosterPlayer) => {
        if (
          isAlt(rosterPlayer, otherRosterPlayer) &&
          otherRosterPlayer.status === InviteStatus.Tentative
        ) {
          rosterPlayer.status = InviteStatus.Tentative;
        }
        return false;
      });
      return false;
    });
    setRoster([...currentRoster.sort(sortFunctions[sorting])]);
  };

  const loadData = (data: Update) => {
    updateBuildStatus(data.builds, data.players, data.absences);
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
      loadBuilds(data.builds);
    }

    const differencesBuildSelection = _.differenceWith(
      data.builds.map((build) => {
        return {
          label: `${build.name} - ${new Date(build.date).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}`,
          value: UUID()
        };
      }),
      buildSelection,
      (a: SelectOption[], b: SelectOption[]) => {
        return _.isEqual(_.omit(a, ["value", "date"]), _.omit(b, ["value", "date"]));
      }
    );
    if (differencesBuildSelection.length > 0 || data.builds.length !== buildSelection.length) {
      console.log("Buildnames have changed. Reloading");
      loadBuildNames(data.builds);
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
      loadAbsence(data.absences, data.players);
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
      updateRosterStatus(data.players, data.builds, data.absences);
    }
  };

  const handleWebsocketUpdate = (event: MessageEvent<any>) => {
    const received_message: WebSocketMessage = JSON.parse(event.data);
    if (!["update", "absence"].includes(received_message.message_type)) {
      const newMessage = BuildHelper.parseMessage(received_message, buildSelection);
      console.log(newMessage);
      setMessageHistory([newMessage, ...messageHistory]);
    }
    if (received_message.socketId === socketId) {
      console.log("Message is from self");
      return;
    }
    console.log(received_message);
    switch (received_message.message_type) {
      case "addplayer": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        const foundBuild = selectedBuilds.find(
          (selectedBuild) => selectedBuild?.value === data.build_id
        );
        if (foundPlayer && foundBuild) {
          data.player.raid = selectedBuilds.indexOf(foundBuild);
          console.log(`Adding player ${JSON.stringify(data.player)}`);
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
          console.log(`Updating player ${JSON.stringify(data.player)}`);
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
          console.log(`Removing player ${JSON.stringify(data.player)}`);
          removePlayerFromRaid(data.player, false, false);
        }
        break;
      }
      case "addbuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = builds.find((build) => build?.id === data.build.id);
        if (!foundBuild) {
          console.log(`Adding build ${JSON.stringify(data)}`);
          addBuild(data.build.name, data.build.build_id, false, false, data.build.id);
        }
        break;
      }
      case "deletebuild": {
        const data: BuildData = received_message.data as BuildData;
        const foundBuild = builds.find((build) => build?.id === data.build.id);
        if (foundBuild) {
          console.log(`Removing build ${JSON.stringify(data)}`);
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
          console.log(`Resetting build ${JSON.stringify(data)}`);
          resetBuild(selectedBuilds.indexOf(foundBuild), false);
        }
        break;
      }
      case "updatebuild": {
        const data: BuildData = received_message.data as BuildData;
        console.log(data);
        const foundBuild = selectedBuilds.find((build) => build.value === data.build.id);
        if (foundBuild) {
          if (foundBuild.date !== data.build.date) {
            console.log(`Updating build date ${JSON.stringify(data)}`);
            handleDateSelect(
              builds[selectedBuilds.indexOf(foundBuild)].build_id,
              data.build.date,
              false
            );
          }
          if (builds[selectedBuilds.indexOf(foundBuild)].instance !== data.build.instance) {
            console.log(`Updating build instance ${JSON.stringify(data)}`);
            setBuildInstance(
              builds[selectedBuilds.indexOf(foundBuild)].build_id,
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
          console.log(`Updating roster ${JSON.stringify(data)}`);
          updateRoster(data.player, false, false);
        }
        break;
      }
      case "removeroster": {
        const data: PlayerData = received_message.data as PlayerData;
        const foundPlayer = roster.find((rosterPlayer) => rosterPlayer?.id === data.player.id);
        if (foundPlayer) {
          console.log(`Deleting from roster ${JSON.stringify(data)}`);
          removeFromRoster(data.player, false, false);
        }
        break;
      }
      case "absence": {
        const data: AbsenceData = received_message.data as AbsenceData;
        console.log(`Updating absence ${JSON.stringify(data)}`);
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
          updateBuildStatus(builds, roster, [...absence, newAbsence]);
          updateRosterStatus(roster, builds, [...absence, newAbsence]);
        }
        break;
      }
      case "update":
        console.log("Updating");
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
            const buildNames = update.builds.map((build) => {
              return {
                value: build.id,
                label: `${build.name} - ${new Date(build.date).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}`
              };
            });
            BuildHelper.parseGetMessages(MESSAGES_TO_LOAD, buildNames, update.players).then(
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
    const interval = setInterval(() => {
      setLogoutTime(
        Math.floor(accountRoleTimeouts[accountRole] / 60) -
          Math.floor((new Date().getTime() - issueTime) / 60000)
      );
    }, parseInt(process.env.REACT_APP_UPDATE_INTERVAL));

    return () => clearInterval(interval);

    //eslint-disable-next-line
  }, [handleError, isLoading, roster, builds, absence, buildSelection, selectedBuilds]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider
      value={{
        importPlayer,
        removePlayerFromRaid,
        resetBuild,
        getBuild,
        editPlayer,
        updateRoster,
        removeFromRoster,
        handleSorting,
        getCurrentSorting,
        handleBuildSelect,
        handleDateSelect,
        getBuilds,
        addBuild,
        deleteBuild,
        setRosterExpanded,
        getRosterExpanded,
        getPlayerAbsence,
        setBuildInstance,
        getOtherBuilds,
        getAbsentPlayers,
        getUnsetMains,
        handleShowError,
        removePlayerFromRaids,
        getAlts,
        getMains,
        getSelectedBuilds
      }}
    >
      <ModalAdd editPlayer={editPlayerModalFn} accountRole={accountRole} />
      <ModalAlert handleOpen={handleShowError} />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <StickyBox
          style={{
            width: "40%",
            borderBottom: `1px solid black`,
            borderRight: `1px solid black`
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
              backgroundSize: "20%"
            }}
            justifySelf={"center"}
          >
            <MessageBuild messages={messageHistory} accountRole={accountRole}></MessageBuild>
            <Button sx={{ marginTop: "20px" }} onClick={logout}>
              <Tooltip title={common(`logout`)}>
                <Logout />
              </Tooltip>
            </Button>
          </Box>
        </StickyBox>
        <div style={{ width: "100%" }}>
          <Raid
            manager={manager}
            id={0}
            raidBuild={builds.find((build) => build?.build_id === 0) ?? builds[0]}
            builds={buildSelection}
            selectedBuild={selectedBuilds[0]}
            version={version}
            editing
            accountRole={accountRole}
          ></Raid>
          <br></br>
          <br></br>
          <Raid
            manager={manager}
            id={1}
            raidBuild={builds.find((build) => build?.build_id === 1) ?? builds[1]}
            builds={buildSelection}
            selectedBuild={selectedBuilds[1]}
            version={version}
            editing
            accountRole={accountRole}
          ></Raid>
          <br></br>

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              style={{ height: "100px", width: "219px" }}
              key={UUID()}
              onClick={handleChangeVersion}
            >
              <Tooltip title={common(`version.${version}`)}>
                <img
                  width={"219"}
                  height={"100"}
                  alt={common(`version.${version}`)}
                  src={version === "Cataclysm" ? cataclysm : wotlk}
                ></img>
              </Tooltip>
            </Button>
          </Box>
          <Box display={"flex"} justifyContent={"center"} marginBottom={"20px"}>
            Automatic logout in {logoutTime} {logoutTime > 1 ? "Minutes" : "Minute"}
          </Box>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default EditBuildPage;
