/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContextProvider } from "../../components/App/context";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import Roster from "../../components/Roster";
import { Absence, Build, BuildPlayer, SelectOption} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import { InviteStatus } from "../../consts";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import { RoleProvider } from "../../utils/RoleProvider";
import { Button, Tooltip } from "@mui/material";
import cataclysm from "../../icons/Cataclysmlogo.webp";
import wotlk from "../../icons/WrathLogo.webp";
import { createDragDropManager } from 'dnd-core'
import Raid from "../../components/Raid";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalPostDiscord from "../../components/ModalPostDiscord";
import ModalAlert from "../../components/ModalAlert";

export interface EditBuildPageProps {}

const EditBuildPage: FC<EditBuildPageProps> = () => {

  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();
  const handleError = useErrorHandler();
  const [nameRaid1, setNameRaid1] = useState<string>(common("build.new"));
  const [nameRaid2, setNameRaid2] = useState<string>(common("build.new"));
  const [playersRaid1, setPlayersRaid1] = useState<BuildPlayer[]>([]);
  const [playersRaid2, setPlayersRaid2] = useState<BuildPlayer[]>([]);
  const [buildRaid1, setBuildRaid1] = useState<Build>({} as Build);
  const [buildRaid2, setBuildRaid2] = useState<Build>({} as Build);
  const [, setDateRaid1] = useState(0);
  const [, setDateRaid2] = useState(0);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [sorting, setSorting] = useState('');
  const [builds, setBuilds] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState("Cataclysm");
  const [rosterExpanded, setRosterExpanded] = useState(false)
  const [absence, setAbsence] = useState<Absence[]>([])
  const manager = createDragDropManager(HTML5Backend)

  const _ = require('lodash');

  //TODO: Sort by tanks, then healers, then melee dps, then ranged dps
  const sortFunctions : any = {
    "NAME": function(a:BuildPlayer,b:BuildPlayer) { return a.name.localeCompare(b.name)},
    "ROLETANK": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.Tank)? -1 : 1},
    "ROLEMELEE": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.MeleeDPS)? -1 : 1},
    "ROLERANGED": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.RangedDPS)? -1 : 1},
    "ROLEHEALER": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.Healer)? -1 : 1}
  }

  let openEditModal: any = () => {};
  let handleModalOpen: any = () => {};

  const MAX_SET_CHARACTERS = 2

  const setBuild = async (buildId: number, build: Build) => {
    switch (buildId) {
      case 1:
        setBuildRaid2(build)
        await setPlayersRaid2(build.players)
        break;
      default:
        setBuildRaid1(build)
        await setPlayersRaid1(build.players)
        break;
    }
  }

  const getBuild = (buildId: number) => {
    switch (buildId) {
      case 1:
        return buildRaid2;
      default:
        return buildRaid1;
    }
  }

  const getEmptyBuild = () => {
    return {
      "id": UUID(),
      "name": common("build.new"),
      "date": 0,
      "players": []
    } as Build
  }

  const setBuildPlayers = async (buildId: number, players: BuildPlayer[]) => {
    switch (buildId){
      case 1:
        buildRaid2.players = players;
        await setPlayersRaid2(buildRaid2.players)
        break;
      default:
        buildRaid1.players = players;
        await setPlayersRaid2(buildRaid1.players)
        break;
    }
  }

  const getBuildPlayers = (buildId: number) => {
    switch (buildId) {
      case 1:
        return buildRaid2.players;
      default:
        return buildRaid1.players;
    }
  }

  const getOtherBuildPlayers = (buildId: number) => {
    switch (buildId) {
      case 1:
        return buildRaid1.players;
      default:
        return buildRaid2.players;
    }
  }

  const getOtherBuildName = (buildId: number) => {
    switch (buildId) {
      case 1:
        return buildRaid1?.name;
      default:
        return buildRaid2?.name;
    }
  }

  const setBuildName = (newName:string, buildId: number) => {
    switch (buildId) {
      case 1:
        buildRaid2.name = newName
        setNameRaid2(newName)
        break;
      default:
        buildRaid1.name = newName
        setNameRaid1(newName)
        break;
    }
  }

  const setBuildDate = (newDate:number, buildId: number) => {
    switch (buildId) {
      case 1:
        buildRaid2.date = newDate
        setDateRaid2(newDate)
        break;
      default:
        buildRaid1.date = newDate
        setDateRaid1(newDate)
        break;
    }
  }

  const getBuildName = (buildId: number) => {
    switch (buildId) {
      case 1:
        return buildRaid2.name;
      default:
        return buildRaid1.name;
    }
  }

  const deletePlayer = async (deletedPlayer: BuildPlayer, buildId: number): Promise<void> => {
    if(deletedPlayer.raid === -1){
      return
    }

    console.log(`Deleting player ${JSON.stringify(deletedPlayer)} in raid ${buildId}`)
    deletedPlayer.raid = -1
    deletedPlayer.group = undefined
    const newPlayers = getBuildPlayers(buildId).filter((player) => player.id !== deletedPlayer.id)

    setBuildPlayers(buildId, newPlayers)
    updateRosterStatus(deletedPlayer, roster)
    saveCurrentBuild(newPlayers, buildId, getBuildName(buildId))
  }

  const addPlayer = async (addedPlayer: BuildPlayer, buildId: number): Promise<void> => {
    console.log(`Adding player ${JSON.stringify(addedPlayer)} in raid ${buildId}`)
    addedPlayer.raid = buildId
    addedPlayer.status = InviteStatus.Unknown
    const newPlayers = [...getBuildPlayers(buildId),addedPlayer]
    setBuildPlayers(buildId, newPlayers)
    updateRosterStatus(addedPlayer, roster)
    saveCurrentBuild(newPlayers, buildId, getBuildName(buildId))
  }

  const movePlayer = async (movedPlayer: BuildPlayer, buildId: number): Promise<void> => {
    console.log(`Moving player ${JSON.stringify(movedPlayer)} in raid ${buildId}`)
    movedPlayer.raid = buildId
    const newPlayers = getBuildPlayers(buildId).map((player) => {
      if(player.id === movedPlayer.id){
        player.group = movedPlayer.group
      }
      return player
    })
    setBuildPlayers(buildId, newPlayers)
    updateRosterStatus(movedPlayer, roster)
    saveCurrentBuild(newPlayers, buildId, getBuildName(buildId))
  }

  const hasCharacterInRaid = (character : BuildPlayer, buildId: number) => {
    if(getBuild(buildId).players.find((player) => isAlt(player, character))){
      return true
    }
    return false
  }

  const importPlayerToRaid = async (newPlayer:BuildPlayer, buildId: number) => {

    if(hasCharacterInRaid(newPlayer, buildId)){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.exists"),params:{"player":newPlayer.main}})
      return
    }

    const oldRaidCharacter = getOtherBuildPlayers(newPlayer.raid).find((otherBuildPlayer) => otherBuildPlayer.id === newPlayer.id)
    // If the character exists in the other raid, we are moving from one raid to the other
    if(oldRaidCharacter){
      deletePlayer(oldRaidCharacter, oldRaidCharacter.raid)
      addPlayer(newPlayer, newPlayer.raid)
      return
    }

    const otherRaidCharacter = getBuildPlayers(newPlayer.raid).find((otherBuildPlayer) => otherBuildPlayer.id === newPlayer.id)
    // If the character exists in the current raid, we are simply swapping groups
    if(otherRaidCharacter){
      movePlayer(newPlayer, newPlayer.raid)
      return
    }

    // Otherwise we are moving from the roster to a raid
    addPlayer(newPlayer, buildId)
  }

  const importPlayer = async (newPlayer: BuildPlayer, buildId: number): Promise<void> => {
    if(isPlayerAbsent(newPlayer, getBuild(buildId).date) && newPlayer.raid !== -1){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.tentative"),params:{"player":newPlayer.name}})
      return
    }
    if(newPlayer.status === InviteStatus.Declined && newPlayer.raid !== -1){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.declined"),params:{"player":newPlayer.main}})
      return
    }

    // Moving to raid
    if(buildId !== -1){
      importPlayerToRaid(newPlayer, buildId)
      return
    }

    // Moving from raid to roster (i.e. deleting the player from the raid)
    deletePlayer(newPlayer, newPlayer.raid)
  };

  const addToRoster = async (newPlayer: BuildPlayer): Promise<void> => {
    console.log("Adding player to roster "+JSON.stringify(newPlayer))
    const newRoster = [...roster.filter((player) => player.id !== newPlayer.id),newPlayer]
    setRoster(newRoster)
    saveCurrentRoster(newRoster);
  }

  const removeFromRoster = async (removedPlayer: BuildPlayer): Promise<void> => {
    const rosterBuild = [
      ...roster.filter((player : BuildPlayer) => {
        return removedPlayer.id !== player.id
      })
    ]


    const altCharacters = rosterBuild.filter((otherPlayer) => {
      return otherPlayer.main === removedPlayer.name && otherPlayer.id !== removedPlayer.id
    })
    console.log("Removing reference of main character for "+JSON.stringify(altCharacters))
    for(const player of altCharacters){
      player.main = "";
    }

    setRoster([...rosterBuild]);
    deleteFromRoster(removedPlayer);
  }

  const isPlayerAbsent = (player: BuildPlayer, time: number) : boolean => {
    for(const absentPlayer of absence){
      if(absentPlayer.player.name === player.name || absentPlayer.player.name === player.main){

        if(absentPlayer.startDate <= time && absentPlayer.endDate >= time){
          return true;
        }
        return false;
      }
    }
    return false;
  }

  const isAlt = (potentialAlt :BuildPlayer, character: BuildPlayer) : boolean => {
    if(potentialAlt.id !== character.id && (potentialAlt.main === character.name || potentialAlt.main === character.main)){
      return true
    }
    return false
  }

  const updateRosterStatus = (character: BuildPlayer, roster: BuildPlayer[], statusOverride?: InviteStatus) => {
    const rosterCharacter = roster.find((p) => {
      return p.id === character.id
    })

    if(!rosterCharacter){
      return
    }

    if(statusOverride){
      rosterCharacter.status = statusOverride
    }

    if(isPlayerAbsent(character, Date.now())){
      rosterCharacter.status = InviteStatus.Tentative
    }

    if(character.status === InviteStatus.Tentative){
      // If player is absent also set other characters absent{
      roster.map((player: BuildPlayer) => {
        if(player.main === character.name){
          player.status = InviteStatus.Tentative
        }
        return false
      })
      return
    }

    if(character.raid === -1 && character.group !== "roster"){
      rosterCharacter.status = InviteStatus.Unknown
      // If character is moving to roster reset status of declined alts
      roster.map((player: BuildPlayer) => {
        if(isAlt(player, character) && player.status === InviteStatus.Declined){
          player.status = InviteStatus.Unknown
        }
        return false
      })
      return
    }

    if(character.group === "bench"){
      rosterCharacter.status = InviteStatus.Benched
    }
    else if(rosterCharacter.status === InviteStatus.Unknown || rosterCharacter.status === InviteStatus.Benched){
      rosterCharacter.status = InviteStatus.Accepted
    }

    // Get number of characters from this player that are set in raid
    let otherCharactersInRaid = 0
    roster.map((otherCharacter: BuildPlayer) => {
      if(isAlt(otherCharacter, character)){

        if(otherCharacter.status !== InviteStatus.Unknown){
          otherCharactersInRaid +=1;
        }
        if(otherCharacter.group !== "roster"){
          return false
        }

      }
      return false
    })

    // If at least 1 character is set in each raid, set other characters to declined
    if(otherCharactersInRaid >= MAX_SET_CHARACTERS-1){
      roster.map((otherCharacter: BuildPlayer) => {
        if(isAlt(otherCharacter, character) && otherCharacter.status === InviteStatus.Unknown){
          otherCharacter.status = InviteStatus.Declined
        }
        return false
      })
    }

  }

  const saveCurrentBuild = async (playerBuild : BuildPlayer[], buildId: number, buildName: string ) => {
    const build = getBuild(buildId)
    build.name = buildName;
    build.players = playerBuild;
    BuildHelper.parseSaveBuild(build);
  }

  const saveCurrentRoster = async (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSaveRoster(playerBuild);
  }

  const deleteFromRoster = async (player : BuildPlayer) => {
    BuildHelper.parseDeleteRosterPlayer(player);
  }

  const getCurrentRoster = () => {
    return {
      name: common("build.roster"),
      players: roster
    } as Build;
  };

  const saveBuild = async (build: Build) => {
    BuildHelper.parseSaveBuild(build);
  };

  const resetBuild = async (buildId: number) => {
    const currentBuild = getBuild(buildId);
    currentBuild.players = []
    setBuildPlayers(buildId,[])
    saveBuild(currentBuild)
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer) => {
    if (openEditModal) {
      openEditModal(player);
    }
  };

  const loadBuildSql = async(buildId: number): Promise<void> => {
    const currentBuild = localStorage.getItem( `LastBuild-${buildId}`);
    if(currentBuild){
      BuildHelper.parseGetBuild(currentBuild).then((build) => {
        loadBuild(build, buildId);
      })
    }
  }

  const loadBuild = async (build: Build, buildId: number): Promise<void> => {
    build.players.forEach((player)=> player.raid = buildId);
    const previousBuild = getBuildPlayers(buildId);
    await setBuild(buildId, build).then(() => {
      if(previousBuild){
        for(const player of previousBuild){
          updateRosterStatus(player, roster, InviteStatus.Unknown)
        }
      }
      for(const player of roster){
        const playerInGroup = build.players.find((newPlayer) => newPlayer.id === player.id);
        if(playerInGroup){
          updateRosterStatus(playerInGroup, roster);
        }
      }
    })
  };

  const handleChangeVersion = () => {
    const newVersion = version === "Cataclysm"? "Wotlk" : "Cataclysm";
    setVersion(newVersion);
    localStorage.setItem( 'LastVersion', newVersion);
  };

  const handleSorting = (e: any) => {
    setSorting(e.target.value);
    setRoster([...roster].sort(sortFunctions[e.target.value]))
  };

  const handleSelect = (buildId: number) => (value: any) => {

    if(value.value){
      console.log("Setting build to "+JSON.stringify(value))
      localStorage.setItem( `LastBuild-${buildId}`, value.value)
      setBuildName(value.label, buildId)
      loadBuildSql(buildId)
    }
    else{
      setBuildDate(buildId, value.valueOf());
      const currentBuild = getBuild(buildId);
      currentBuild.date = value.valueOf();
      saveBuild(currentBuild);
    }
  };

  const addBuild = async (build: string, buildId: number) => {
    console.log("Adding build "+JSON.stringify(build))

    const newBuild = getEmptyBuild()
    newBuild.name = build;
    await setBuild(buildId, newBuild).then(() => {
      const newBuildSelect = {value:newBuild.id,label:build}
      setBuilds([...builds, newBuildSelect])
      saveBuild(newBuild).then(() => {
        handleSelect(buildId)(newBuildSelect)
      })
    })
  };

  const deleteBuild = async (build: string, buildId: number) => {
    console.log("Deleting build "+JSON.stringify(build))
    const deletedBuild = {value:build,label:build}
    const newBuilds = [...builds.filter((build) => build.value !== deletedBuild.value)]
    setBuilds(newBuilds);

    // TODO: Builds are not deleted from option list until refresh/f5
    await setBuild(buildId, getEmptyBuild()).then(() => {
      setBuildName(common("build.new"), buildId)
      localStorage.removeItem(`LastBuild-${buildId}`)

      BuildHelper.parseDeleteBuild(getBuild(buildId).id)
    })
  };

  const getCurrentSorting = () => {
    return sorting?? "Alphabetical";
  };

  const getBuilds = () => {
    return builds;
  };

  const getRosterExpanded = () => {
    return rosterExpanded;
  };

  const getPlayerAbsence = (player: string) => {
    return absence.filter((absentPlayer) => absentPlayer.player.name === player || absentPlayer.player.main === player)
  }

  const handleShowError = (callback: any) => {
    handleModalOpen = callback;
  };

  const checkForDifferences = (newBuild: Build, buildId: number) => {
    const differencesPlayers = _.differenceWith(newBuild.players, getBuildPlayers(buildId), (a : BuildPlayer, b: BuildPlayer) => {
      return _.isEqual(
        _.omit(a, ['status', 'raid']),
        _.omit(b, ['status', 'raid'])
      )
    })
    if (differencesPlayers.length > 0 || newBuild.players.length !== getBuildPlayers(buildId).length){
      console.log(`Raid ${buildId+1} has changed somewhere. Reloading`)
      loadBuild(newBuild,buildId).then(() => {
        newBuild.players.map((player) => {
          player.raid = buildId;
          updateRosterStatus(player, roster)
          return false
        })
      })
    }

    // TODO: Fix status not updating for deleted characters
    // If a player is deleted in one client update their status
    if (newBuild.players.length < getBuild(buildId).players.length){
      const results = getBuild(buildId).players.filter(({ id: id1 }) => !newBuild.players.some(({ id: id2 }) => id2 === id1));
      //console.log(results[0])
    }
  }

  useEffect(() => {
    if (isLoading){
      setBuildRaid1(getEmptyBuild());
      setBuildRaid2(getEmptyBuild());

      let build0: any = localStorage.getItem('LastBuild-0');
      let build1: any = localStorage.getItem('LastBuild-1');

      BuildHelper.parseGetBuilds().then((loadedBuilds) => {
        const buildObject: SelectOption[] = [];
        for(const build of loadedBuilds){
          buildObject.push({"value": build.id, "label":build.name})
        }

        if(!build0 && buildObject.length > 0){
          build0 = buildObject[0].value
        }
        if(!build1 && buildObject.length > 1){
          build1 = buildObject[1].value
        }

        setBuilds(buildObject)
      })

      BuildHelper.parseGetPlayers().then((newRoster: BuildPlayer[]) => {

        // Load absences and set players to tentative
        BuildHelper.parseGetAbsences().then((loadedAbsences) => {
          const absenceObject: Absence[] = [];
          for(const absence of loadedAbsences){
            newRoster.map((player) => {
              if(player.name === absence.name){
                if(Date.now() <= absence.endDate){
                  updateRosterStatus(player, newRoster, InviteStatus.Tentative)
                }
                absenceObject.push({player, startDate:absence.startDate, endDate:absence.endDate, reason:absence.reason})
              }
              return false
            })
          }
          setAbsence(absenceObject)
        })

        // Load raid 1 and set players to correct state
        if(build0){
          BuildHelper.parseGetBuild(build0).then((build) => {
            loadBuild(build,0).then(() => {
              build.players.map((player) => {
                player.raid = 0;
                updateRosterStatus(player, newRoster)
                return false
              })
            })
          }).catch(handleError);
        }

        // Load raid 2 and set players to correct state
        if(build1){
          BuildHelper.parseGetBuild(build1).then((build) => {
            loadBuild(build,1).then(() => {
              build.players.map((player) => {
                player.raid = 1;
                updateRosterStatus(player, newRoster)
                return false
              })
            })
          }).catch(handleError);
        }
        setRoster(newRoster)
      })



      localStorage.getItem('LastVersion')?? localStorage.setItem("LastVersion", "Wotlk")
      setVersion(localStorage.getItem( 'LastVersion')?? "Wotlk");

      setIsLoading(false);
    }
    const interval = setInterval(() => {
      BuildHelper.parseGetPlayers().then((newRoster) => {
        const differences = _.differenceWith(newRoster, roster, (a : BuildPlayer, b: BuildPlayer) => {
          return _.isEqual(
            _.omit(a, ['status']),
            _.omit(b, ['status'])
          )
        })
        if (differences.length > 0 || newRoster.length !== roster.length){
          console.log("Roster has changed somewhere. Reloading")
          newRoster.map((player) => {
            const otherPlayer = roster.find((rosterPlayer) => rosterPlayer.id === player.id)
            if(otherPlayer){
              player.status = otherPlayer.status
            }
            return false
          })
          setRoster(newRoster)
        }
      })

      if(getBuildName(0) !== common("build.new")){
        BuildHelper.parseGetBuild(getBuild(0).id).then((currentBuild) => {
          checkForDifferences(currentBuild, 0)
        }).catch(handleError);
      }

      if(getBuildName(1) !== common("build.new")){
        BuildHelper.parseGetBuild(getBuild(1).id).then((currentBuild) => {
          checkForDifferences(currentBuild, 1)
        }).catch(handleError);
      }
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [handleError,roster,builds,buildRaid1,buildRaid2,absence,isLoading,playersRaid1,playersRaid2,nameRaid1,nameRaid2]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importPlayer, deletePlayer, resetBuild, getBuild, editPlayer, loadBuildSql, addToRoster, removeFromRoster, getCurrentRoster, handleSorting, getCurrentSorting, handleSelect, getBuilds, addBuild, deleteBuild, setRosterExpanded, getRosterExpanded, getPlayerAbsence, getOtherBuildName }}>
      <ModalAdd editPlayer={editPlayerModalFn} />
      <ModalAlert handleOpen={handleShowError}/>

      <Container sx={{ maxHeight: "100%", display: 'flex', justifyContent:'flex-start' }} maxWidth={false}>
        <Box key={UUID()} sx={{width:"35%"}} css={styles.gridBox}>
          <Roster manager={manager} build={getCurrentRoster()} editing />
        </Box>
        <Container sx={{ maxWidth:'75%'}} maxWidth={false}>
          <Raid manager={manager} id={0} raidBuild={getBuild(0)} builds={builds} version={version} editing ></Raid>
          <ModalPostDiscord buildId={0}></ModalPostDiscord>
          <br></br>
          <Raid manager={manager} id={1} raidBuild={getBuild(1)} builds={builds} version={version} editing ></Raid>
          <ModalPostDiscord buildId={1}></ModalPostDiscord>
          <br></br>

          <Box display={"flex"} justifyContent={"center"}>
            <Button style={{height: '100px', width : '219px', marginTop:'50px', marginBottom:'50px'}} key={UUID()} onClick={handleChangeVersion}>
              <Tooltip title={common(`version.${version}`)}>
                <img width={"219"} height={"100"} alt={common(`version.${version}`)} src={version === 'Cataclysm'? cataclysm : wotlk}></img>
              </Tooltip>
            </Button>
          </Box>

        </Container>
      </Container>
    </AppContextProvider>
  );
};

export default EditBuildPage;
