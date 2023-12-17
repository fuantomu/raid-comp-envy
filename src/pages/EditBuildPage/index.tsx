/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContextProvider } from "../../components/App/context";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import Roster from "../../components/Roster";
import { Build, BuildPlayer, SelectOption} from "../../types";
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
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export interface EditBuildPageProps {}

const EditBuildPage: FC<EditBuildPageProps> = () => {
  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();
  const handleError = useErrorHandler();
  const [nameRaid1, setNameRaid1] = useState<string>(common("build.new"));
  const [nameRaid2, setNameRaid2] = useState<string>(common("build.new"));
  const [playersRaid, setPlayersRaid] = useState<BuildPlayer[]>([]);
  const [playersRaid2, setPlayersRaid2] = useState<BuildPlayer[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [sorting, setSorting] = useState('');
  const [builds, setBuilds] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState("Cataclysm");
  const [rosterExpanded, setRosterExpanded] = useState(false)
  const manager = createDragDropManager(HTML5Backend)

  const _ = require('lodash');


  const sortFunctions : any = {
    "NAME": function(a:BuildPlayer,b:BuildPlayer) { return a.name.localeCompare(b.name)},
    "ROLETANK": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.Tank)? -1 : 1},
    "ROLEMELEE": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.MeleeDPS)? -1 : 1},
    "ROLERANGED": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.RangedDPS)? -1 : 1},
    "ROLEHEALER": function(a:BuildPlayer) { return (RoleProvider.getSpecRole(a.spec) === WarcraftRole.Healer)? -1 : 1}
  }
  let openEditModal: any = () => {};

  const CONNECTION_STRING = {
    "server": process.env.REACT_APP_SQL_HOST,
    "port": '3306',
    "database": process.env.REACT_APP_SQL_DATABASE,
    "uid": process.env.REACT_APP_SQL_USER,
    "password": process.env.REACT_APP_SQL_PASSWORD,
    "table": process.env.REACT_APP_SQL_TABLE,
    "players" : undefined,
    "build": "Current Build"
  };

  const setBuild = async (buildId: number, build: BuildPlayer[]) => {
    switch (buildId) {
      case 1:
        await setPlayersRaid2(build);
        break;
      default:
        await setPlayersRaid(build)
        break;
    }
  }

  const getBuildPlayers = (buildId: number) => {
    switch (buildId) {
      case 1:
        return playersRaid2;
      default:
        return playersRaid;
    }
  }

  const getOtherBuild = (buildId: number) => {
    switch (buildId) {
      case 1:
        return playersRaid;
      default:
        return playersRaid2;
    }
  }

  const setBuildName = (newName:string, buildId: number) => {
    switch (buildId) {
      case 1:
        setNameRaid2(newName);
        break;
      default:
        setNameRaid1(newName)
        break;
    }
  }

  const getBuildName = (buildId: number) => {
    switch (buildId) {
      case 1:
        return nameRaid2;
      default:
        return nameRaid1;
    }
  }

  const deletePlayer = async (deletedPlayer: BuildPlayer, buildId: number): Promise<void> => {
    console.log(`Deleting player ${JSON.stringify(deletedPlayer)} in raid ${buildId}`)
    const newPlayers = getBuildPlayers(buildId).filter((player) => player.id !== deletedPlayer.id)
    setBuild(buildId, newPlayers)
    updateRosterStatus(deletedPlayer, roster)
    saveCurrentBuild(newPlayers, buildId, getBuildName(buildId))
  }

  const addPlayer = async (addedPlayer: BuildPlayer, buildId: number): Promise<void> => {
    console.log(`Adding player ${JSON.stringify(addedPlayer)} in raid ${buildId}`)
    const newPlayers = [...getBuildPlayers(buildId),addedPlayer]
    setBuild(buildId, newPlayers)
    updateRosterStatus(addedPlayer, roster)
    saveCurrentBuild(newPlayers, buildId, getBuildName(buildId))
  }

  const importPlayer = async (newPlayer: BuildPlayer, buildId: number): Promise<void> => {
      // Moving to raid
      if(typeof buildId !== "undefined"){
        const oldPlayer = getBuildPlayers(buildId).find((player) => player.id === newPlayer.id)
        const oldPlayerOther = getOtherBuild(buildId).find((player) => player.id === newPlayer.id)

        // Moving from one raid to the other
        if (typeof oldPlayer === "undefined" && oldPlayerOther){
          console.log(`Moving player ${JSON.stringify(newPlayer)} from ${oldPlayerOther.raid} to ${buildId}`)
          const otherCharacters = getOtherCharacters(newPlayer,getBuildPlayers(buildId));

          if(otherCharacters.length > 0){
            console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters)+" in raid "+buildId)
          }
          else{
            addPlayer(newPlayer, buildId)
            deletePlayer(newPlayer, oldPlayerOther.raid)
          }
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
            setBuild(buildId, playerBuild)
          }
          else if(oldRosterPlayer){
            console.log("Editing roster player "+JSON.stringify(oldRosterPlayer))

            if (getOtherBuild(buildId).find((otherBuildPlayer) => otherBuildPlayer.id === oldRosterPlayer.id) && newPlayer.group !== "roster"){
              console.log("This character is already set in the other raid " + JSON.stringify(getOtherBuild(buildId)))
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
                  setBuild(buildId, playerBuild)
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
              setBuild(buildId, playerBuild)
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
      otherPlayer.id !== player.id && (otherPlayer.main?.length?? 0 > 0) && (player.main?.length?? 0 > 0)
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
    deleteFromRoster([removedPlayer]);
  }

  const updateRosterStatus = async (player: BuildPlayer, roster: BuildPlayer[], statusOverride?: InviteStatus) : Promise<BuildPlayer[]> => {
    for (const rosterPlayer of roster) {
      if(rosterPlayer.id === player.id){
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
        }
        else{
          if(player.group === "roster"){
            rosterPlayer.status = InviteStatus.Unknown;
          }
          else if(player.group === "bench"){
            rosterPlayer.status = InviteStatus.Benched;
          }
          else if(player.group){
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
          }
          else{
            rosterPlayer.status = InviteStatus.Unknown
          }
        }
        break;
      }
    }
    return roster;
  }

  const saveCurrentBuild = async (playerBuild : BuildPlayer[], buildId: number, buildName?: string, ) => {
    const connectionString = CONNECTION_STRING;
    connectionString.build = buildName?? `Current Build-${buildId}`;
    BuildHelper.parseSqlBuildSave(connectionString, playerBuild);
  }

  const saveCurrentRoster = async (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSqlRosterSave(CONNECTION_STRING, playerBuild);
  }

  const deleteFromRoster = async (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSqlRosterDeletePlayers(CONNECTION_STRING, playerBuild);
  }

  const getCurrentBuild = (buildId: number) => {
    return {
      name: getBuildName(buildId) ?? common("build.unnamed"),
      players: getBuildPlayers(buildId),
    } as Build;
  };

  const getCurrentRoster = () => {
    return {
      name: common("build.roster"),
      players: roster
    } as Build;
  };

  const saveBuild = async (buildId: number) => {
    saveCurrentBuild(getCurrentBuild(buildId).players, buildId, getBuildName(buildId));
  };

  const resetBuild = async (buildId: number) => {
    const connectionString = CONNECTION_STRING;
    const currentBuild = localStorage.getItem(`LastBuild-${buildId}`)?? `Current Build-${buildId}`
    connectionString.build = currentBuild;
    setBuildName(currentBuild, buildId);
    setBuild(buildId, [])
    await saveCurrentBuild([], buildId, currentBuild).then(() => {
      BuildHelper.parseSqlDelete(connectionString)
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

  const loadBuildSql = async(build: string, buildId: number): Promise<void> => {
    const connectionString = CONNECTION_STRING;
    connectionString.build = build;
    BuildHelper.parseSqlLoad(connectionString).then((build) => {
      loadBuild(build, buildId);
    }
    )
  }

  const loadRoster = async (newRoster: BuildPlayer[]): Promise<void> => {
    setRoster([...newRoster]);
  };

  const loadBuild = async (newPlayers: BuildPlayer[], buildId: number): Promise<void> => {
    newPlayers.forEach((player)=> player.raid = buildId);
    const previousBuild = getBuildPlayers(buildId);
    await setBuild(buildId, newPlayers).then(() => {
      for(const player of previousBuild){
        updateRosterStatus(player, roster, InviteStatus.Unknown)
      }
      for(const player of roster){
        const playerInGroup = newPlayers.find((newPlayer) => newPlayer.id === player.id);
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

  const handleSelectBuild = (buildId: number) => (build: SelectOption) => {
    console.log("Setting build to "+JSON.stringify(build.value))
    setBuildName(build.value, buildId);
    localStorage.setItem( `LastBuild-${buildId}`, build.value)

    loadBuildSql(build.value, buildId)
  };

  const addBuild = (build: string, buildId: number) => {
    console.log("Adding build "+JSON.stringify(build))
    const newBuild = {value:build,label:build}
    setBuilds([...builds, newBuild])
    setBuild(buildId, [])

    handleSelectBuild(buildId)(newBuild)
    saveCurrentBuild([], buildId, build)
  };

  const deleteBuild = (build: string, buildId: number) => {
    console.log("Deleting build "+JSON.stringify(build))
    const deletedBuild = {value:build,label:build}
    const newBuilds = [...builds.filter((build) => build.value !== deletedBuild.value)]
    setBuild(buildId, [])

    handleSelectBuild(buildId)(newBuilds[0])

    const connectionString = CONNECTION_STRING;
    connectionString.build = deletedBuild.value;

    BuildHelper.parseSqlDelete(connectionString)
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

  const handlePostDiscord = (buildId: number) => {
    console.log("Post Setup to discord")
    BuildHelper.parsePostSetup(getBuildPlayers(buildId))
  };

  useEffect(() => {
    const connectionString = CONNECTION_STRING;
    if (isLoading){
      const build0 = localStorage.getItem( 'LastBuild-0')?? 'Current Build-0';
      const build1 = localStorage.getItem( 'LastBuild-1')?? 'Current Build-1';

      BuildHelper.parseSqlImport(connectionString).then((roster) => {
        loadRoster(roster).then(() => {
          connectionString.build = build0;
          BuildHelper.parseSqlLoad(connectionString).then((build) => {
            setBuildName(build0,0);
            loadBuild(build,0).then(() => {
              for(const player of build){
                updateRosterStatus(player, roster)
              }
            })
          }).catch(handleError);

          connectionString.build = build1;
          BuildHelper.parseSqlLoad(connectionString).then((build) => {
              setBuildName(build1,1);
              loadBuild(build,1).then(() => {
                for(const player of build){
                  updateRosterStatus(player, roster)
                }
              })
          }).catch(handleError);
        })
      })

      BuildHelper.parseBuildsLoad(connectionString).then((loadedBuilds) => {
        const buildObject: SelectOption[] = [];
        for(const build of loadedBuilds){
          buildObject.push({"value": build, "label":build})
        }
        setBuilds(buildObject)
      })
      setVersion(localStorage.getItem( 'LastVersion')?? "Cataclysm");
      setIsLoading(false);
    }
    const interval = setInterval(() => {
      BuildHelper.parseSqlImport(connectionString).then((currentRoster) => {
        const differences = _.differenceWith(currentRoster, roster, (a : BuildPlayer, b: BuildPlayer) => {
          return _.isEqual(
            _.omit(a, ['status']),
            _.omit(b, ['status'])
          )
        })
        if (differences.length > 0){
          console.log("Roster has changed somewhere. Reloading")
          setRoster(currentRoster)
        }
      })
      connectionString.build = getBuildName(0);
      BuildHelper.parseSqlLoad(connectionString).then((currentBuild) => {
        const differences = _.differenceWith(currentBuild, playersRaid, (a : BuildPlayer, b: BuildPlayer) => {
          return _.isEqual(
            _.omit(a, ['status']),
            _.omit(b, ['status'])
          )
        })
        if (differences.length > 0){
          console.log("Raid 1 has changed somewhere. Reloading")
          setBuild(0, currentBuild).then(() => {
            for(const player of currentBuild){
              updateRosterStatus(player, roster)
            }
          })
        }
      }).catch(handleError);
      connectionString.build = getBuildName(1);
      BuildHelper.parseSqlLoad(connectionString).then((currentBuild) => {
        const differences = _.differenceWith(currentBuild, playersRaid2, (a : BuildPlayer, b: BuildPlayer) => {
          return _.isEqual(
            _.omit(a, ['status']),
            _.omit(b, ['status'])
          )
        })
        if (differences.length > 0){
          console.log("Raid 2 has changed somewhere. Reloading")
          setBuild(1, currentBuild).then(() => {
            for(const player of currentBuild){
              updateRosterStatus(player, roster)
            }
          })
        }
      }).catch(handleError);
    }, 2000);

    return () => clearInterval(interval);
  }, [handleError,roster,playersRaid,playersRaid2]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importPlayer, deletePlayer, saveBuild, resetBuild, getCurrentBuild, editPlayer, loadRoster, loadBuildSql, addToRoster, removeFromRoster, getCurrentRoster, handleSorting, getCurrentSorting, handleSelectBuild, getBuilds, addBuild, deleteBuild, setRosterExpanded, getRosterExpanded }}>
      <ModalAdd editPlayer={editPlayerModalFn} />

      <Container sx={{ maxHeight: "100%", display: 'flex', justifyContent:'flex-start' }} maxWidth={false}>
        <Box key={UUID()} sx={{width:"35%"}} css={styles.gridBox}>
          <Roster manager={manager} build={getCurrentRoster()} editing />
        </Box>
        <Container sx={{ maxWidth:'75%'}} maxWidth={false}>
          <Raid manager={manager} id={0} raidBuild={getCurrentBuild(0)} builds={builds} version={version} editing ></Raid>
          <Box display={"grid"} justifyContent={"center"}>
            <Tooltip title={common("cta.postDiscord")} placement="top" arrow>
              <Button color="info" variant="contained" size="large" style={{height: '30px', width: '130px'}} onClick={() => handlePostDiscord(0)}>
                <SportsEsportsIcon />
              </Button>
            </Tooltip>
          </Box>
          <br></br>
          <Raid manager={manager} id={1} raidBuild={getCurrentBuild(1)} builds={builds} version={version} editing ></Raid>
          <Box display={"grid"} justifyContent={"center"}>
            <Tooltip title={common("cta.postDiscord")} placement="top" arrow>
              <Button color="info" variant="contained" size="large" style={{height: '30px', width: '130px'}} onClick={() => handlePostDiscord(1)}>
                <SportsEsportsIcon />
              </Button>
            </Tooltip>
          </Box>
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
