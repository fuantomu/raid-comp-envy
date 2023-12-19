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
  const [dateRaid1, setDateRaid1] = useState(0);
  const [dateRaid2, setDateRaid2] = useState(0);
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

  const importPlayer = async (newPlayer: BuildPlayer, buildId: number): Promise<void> => {
      if(newPlayer.status === InviteStatus.Tentative){
        console.log("Player is absent and cannot participate in the raid")
        return
      }

      // Moving to raid
      if(typeof buildId !== "undefined"){

        const oldPlayer = getBuildPlayers(buildId).find((player) => player.id === newPlayer.id)
        const oldPlayerOther = getOtherBuildPlayers(buildId).find((player) => player.id === newPlayer.id)

        // Moving from one raid to the other
        if (typeof oldPlayer === "undefined" && oldPlayerOther){
          console.log(`Moving player ${JSON.stringify(newPlayer)} from ${oldPlayerOther.raid} to ${buildId}`)
          const otherCharacters = getOtherCharacters(newPlayer,getBuildPlayers(buildId));

          if(otherCharacters.length > 0){
            console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters)+" in raid "+buildId)
            return
          }

          addPlayer(newPlayer, buildId)
          deletePlayer(newPlayer, oldPlayerOther.raid)
        }
        else{
          const oldRosterPlayer = roster.find((player) => player.id === newPlayer.id)
          let playerBuild = getBuildPlayers(buildId);
          if(oldPlayer){
            console.log("Editing player "+JSON.stringify(oldPlayer))

            if(newPlayer.group !== oldPlayer.group){
              console.log("Moving player from group "+oldPlayer.group+" to "+newPlayer.group+" in raid "+ buildId)
            }
            newPlayer.raid = buildId

            if(newPlayer.group !== 'roster'){
              playerBuild = [...playerBuild.filter((player) => player.id !== oldPlayer.id),newPlayer]

            }
            else{
              playerBuild = [...playerBuild.filter((player) => player.id !== oldPlayer.id)]
            }
            setBuildPlayers(buildId, playerBuild)
          }
          else if(oldRosterPlayer){
            console.log("Editing roster player "+JSON.stringify(oldRosterPlayer))

            if (getOtherBuildPlayers(buildId).find((otherBuildPlayer) => otherBuildPlayer.id === oldRosterPlayer.id) && newPlayer.group !== "roster"){
              console.log("This character is already set in the other raid " + JSON.stringify(getOtherBuildPlayers(buildId)))
            }
            else{
              if(newPlayer.group !== oldRosterPlayer.group){
                console.log("Moving roster player from group "+oldRosterPlayer.group+" to "+newPlayer.group+" in raid "+ buildId)
                const otherCharacters = getOtherCharacters(newPlayer,getBuildPlayers(buildId));

                if(otherCharacters.length > 0){
                  console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters)+" in raid "+buildId)
                }
                else{
                  newPlayer.raid = buildId
                  playerBuild = [...playerBuild.filter((player) => player.id !== oldRosterPlayer.id),newPlayer]
                  setBuildPlayers(buildId, playerBuild)
                }
              }
            }
          }
          else{
            console.log("Adding player "+JSON.stringify(newPlayer)+" in raid "+buildId)

            const otherCharacters = getOtherCharacters(newPlayer, getBuildPlayers(buildId));

            if(otherCharacters.length > 0){
              console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters)+" in raid "+buildId)
            }
            else{
              newPlayer.raid = buildId
              playerBuild = [...playerBuild,newPlayer]
              setBuildPlayers(buildId, playerBuild)
            }
          }
          updateRosterStatus(newPlayer, roster)
          saveCurrentBuild(playerBuild, buildId, getBuildName(buildId))
        }
      }
      // Moving from raid to roster
      else{
        console.log(`Moving player ${JSON.stringify(newPlayer)} to roster`)
        deletePlayer(newPlayer, newPlayer.raid)
      }
  };

  const getOtherCharacters = (player: BuildPlayer, players: BuildPlayer[]): BuildPlayer[] => {
    return players.filter((otherPlayer) => {
      return (otherPlayer.main === player.name || otherPlayer.name === player.main || otherPlayer.main === player.main) &&
      otherPlayer.id !== player.id && (otherPlayer.main??"".length > 0) && (player.main??"".length > 0)
    })
  }

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

  const isPlayerAbsent = (player: BuildPlayer) : boolean => {
    const currentDate = new Date().getTime()
    for(const absentPlayer of absence){
      if(absentPlayer.player.name === player.name || absentPlayer.player.name === player.main){
        if(absentPlayer.startDate <= currentDate && absentPlayer.endDate > currentDate){
          return true;
        }
        return false;
      }
    }
    return false;
  }

  const updateRosterStatus = async (player: BuildPlayer, roster: BuildPlayer[], statusOverride?: InviteStatus) => {
    const rosterPlayer = roster.find((p) => p.id === player.id)
    if(rosterPlayer){
      console.log(rosterPlayer)
      console.log(player)
      if(isPlayerAbsent(rosterPlayer)){
        rosterPlayer.status = InviteStatus.Tentative
        return
      }
      console.log("Player not absent")

      if(typeof statusOverride !== "undefined"){
        rosterPlayer.status = statusOverride
        const otherCharacters = getOtherCharacters(player, roster);
        if(otherCharacters.filter((otherCharacter) => otherCharacter.status === InviteStatus.Accepted).length >= 1){
          for(const otherCharacter of otherCharacters){
            if(otherCharacter.status === InviteStatus.Declined){
                otherCharacter.status = InviteStatus.Unknown;
            }
          }
        }
        return
      }
      console.log("No override")

      if(player.group === "roster"){
        rosterPlayer.status = InviteStatus.Unknown;
        return
      }
      console.log("Not roster")

      if(player.group === "bench" && player.raid !== -1){
        rosterPlayer.status = InviteStatus.Benched;
        return
      }
      console.log("Not bench")

      if(player.group){
        rosterPlayer.status = InviteStatus.Accepted;
        const otherCharacters = getOtherCharacters(player, roster);
        if(otherCharacters.filter((otherCharacter) => otherCharacter.status === InviteStatus.Accepted).length > 0){
          console.log(`Player ${rosterPlayer.name} has already set 2 characters in raid`)
          for(const otherCharacter of otherCharacters){
            if(otherCharacter.status !== InviteStatus.Accepted){
              otherCharacter.status = InviteStatus.Declined;
            }
          }
        }
        return
      }

      rosterPlayer.status = InviteStatus.Unknown
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
    setBuildName(currentBuild.name, buildId);
    setBuild(buildId, getEmptyBuild())
    await saveCurrentBuild([], buildId, currentBuild.id).then(() => {
      BuildHelper.parseDeleteBuild(`Build-${currentBuild.id}`)
    });
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

  const loadRoster = async (newRoster: BuildPlayer[]): Promise<void> => {
    setRoster([...newRoster]);
  };

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
      //handleSelectBuild(buildId)(newBuilds[-1])

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

      BuildHelper.parseGetPlayers().then((roster) => {
        loadRoster(roster).then(() => {
          if(build0){
            BuildHelper.parseGetBuild(build0).then((build) => {
              loadBuild(build,0).then(() => {
                for(const player of build.players){
                  player.raid = 0;
                  updateRosterStatus(player, roster)
                }
              })
            }).catch(handleError);
          }

          if(build1){
            BuildHelper.parseGetBuild(build1).then((build) => {
              loadBuild(build,1).then(() => {
                for(const player of build.players){
                  player.raid = 1;
                  updateRosterStatus(player, roster)
                }
              })
            }).catch(handleError);
          }


          BuildHelper.parseGetAbsences().then((loadedAbsences) => {
            const absenceObject: Absence[] = [];
            for(const absence of loadedAbsences){
              const rosterPlayer = roster.find((player) => player.name === absence.name)
              if(rosterPlayer){
                absenceObject.push({player:rosterPlayer, startDate:absence.startDate, endDate:absence.endDate, reason:absence.reason})
              }
            }
            setAbsence(absenceObject)
          })
        })
      })

      setVersion(localStorage.getItem( 'LastVersion')?? "Wotlk");
      setIsLoading(false);
    }
    const interval = setInterval(() => {
      BuildHelper.parseGetPlayers().then((currentRoster) => {
        const differences = _.differenceWith(currentRoster, roster, (a : BuildPlayer, b: BuildPlayer) => {
          return _.isEqual(
            _.omit(a, ['status']),
            _.omit(b, ['status'])
          )
        })
        if (differences.length > 0 || currentRoster.length !== roster.length){
          console.log("Roster has changed somewhere. Reloading")
          setRoster(currentRoster)
        }
      })

      if(getBuildName(0) !== common("build.new")){
        BuildHelper.parseGetBuild(getBuild(0).id).then((currentBuild) => {
          const differences = _.differenceWith(currentBuild, getBuildPlayers(0), (a : BuildPlayer, b: BuildPlayer) => {
            return _.isEqual(
              _.omit(a, ['status', 'raid']),
              _.omit(b, ['status', 'raid'])
            )
          })
          if (differences.length > 0 || currentBuild.players.length !== getBuildPlayers(0).length){
            console.log("Raid 1 has changed somewhere. Reloading")
            setBuild(0, currentBuild).then(() => {
              for(const player of currentBuild.players){
                player.raid = 0;
                updateRosterStatus(player, roster)
              }
            })
          }
        }).catch(handleError);
      }

      if(getBuildName(1) !== common("build.new")){
        BuildHelper.parseGetBuild(getBuild(1).id).then((currentBuild) => {
          const differences = _.differenceWith(currentBuild, getBuildPlayers(1), (a : BuildPlayer, b: BuildPlayer) => {
            return _.isEqual(
              _.omit(a, ['status', 'raid']),
              _.omit(b, ['status', 'raid'])
            )
          })
          if (differences.length > 0 || currentBuild.players.length !== getBuildPlayers(1).length){
            console.log("Raid 2 has changed somewhere. Reloading")
            setBuild(1, currentBuild).then(() => {
              for(const player of currentBuild.players){
                player.raid = 1;
                updateRosterStatus(player, roster)
              }
            })
          }
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
    <AppContextProvider value={{ importPlayer, deletePlayer, resetBuild, getBuild, editPlayer, loadRoster, loadBuildSql, addToRoster, removeFromRoster, getCurrentRoster, handleSorting, getCurrentSorting, handleSelect, getBuilds, addBuild, deleteBuild, setRosterExpanded, getRosterExpanded, getPlayerAbsence, getOtherBuildName }}>
      <ModalAdd editPlayer={editPlayerModalFn} />

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
