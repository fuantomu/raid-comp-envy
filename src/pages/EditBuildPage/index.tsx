/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { AppContextProvider } from "../../components/App/context";
import BuildRolesCount from "../../components/BuildRolesCount";
import BuildTitle from "../../components/BuildTitle";
import ChangeViewModeButton from "../../components/ChangeViewModeButton";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import ModalImport from "../../components/ModalImport";
import ModalResetBuild from "../../components/ModalResetBuild";
import ModalSaveBuild from "../../components/ModalSaveBuild";
import RaidChecklist from "../../components/RaidChecklist";
import Roster from "../../components/Roster";
import RaidComposition from "../../components/RaidComposition";
import { getBuild } from "../../services/backend";
import { Build, BuildPlayer} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import ModalLoadRoster from "../../components/ModalLoadRoster";
import ModalLoadRosterSQL from "../../components/ModalLoadRosterSQL";
import ModalLoadBuild from "../../components/ModalLoadBuild";
import { InviteStatus } from "../../consts";

export interface EditBuildPageProps {}

const EditBuildPage: FC<EditBuildPageProps> = () => {
  const [common] = useTranslation("common");
  const { buildId } = useParams<{ buildId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();
  const handleError = useErrorHandler();
  const [name, setName] = useState<string>(common("build.new"));
  const [players, setPlayers] = useState<BuildPlayer[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [grouped, setGrouped] = useState(true);
  let openEditModal: any = () => {};

  const CONNECTION_STRING = {
    "server": process.env.REACT_APP_SQL_HOST,
    "port": '3306',
    "database": process.env.REACT_APP_SQL_DATABASE,
    "uid": process.env.REACT_APP_SQL_USER,
    "password": process.env.REACT_APP_SQL_PASSWORD,
    "table": process.env.REACT_APP_SQL_TABLE,
    "players" : undefined,
    "build": "currentBuild"
  };

  const importPlayer = async (newPlayer: BuildPlayer): Promise<void> => {
      const oldPlayer = players.find((player) => player.id === newPlayer.id)
      const oldRosterPlayer = roster.find((player) => player.id === newPlayer.id)
      let playerBuild = players;

      if(oldPlayer){
        console.log("Editing player "+JSON.stringify(oldPlayer))

        if(newPlayer.group !== oldPlayer.group){
          console.log("Moving player from group "+oldPlayer.group+" to "+newPlayer.group)
        }

        if(newPlayer.group !== 'roster'){
          playerBuild = [...playerBuild.filter((player) => player.id !== oldPlayer.id),newPlayer]

        }
        else{
          playerBuild = [...playerBuild.filter((player) => player.id !== oldPlayer.id)]
        }
        setPlayers(playerBuild)

      }
      else if(oldRosterPlayer){
        console.log("Editing roster player "+JSON.stringify(oldRosterPlayer))

        if(newPlayer.group !== oldRosterPlayer.group){
          console.log("Moving roster player from group "+oldRosterPlayer.group+" to "+newPlayer.group)
          const otherCharacters = getOtherCharacters(newPlayer,players);

          if(otherCharacters.length > 0){
            console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters))
          }
          else{
            playerBuild = [...playerBuild.filter((player) => player.id !== oldRosterPlayer.id),newPlayer]
            setPlayers(playerBuild)
          }
        }
      }
      else{
        console.log("Adding player "+JSON.stringify(newPlayer))

        const otherCharacters = getOtherCharacters(newPlayer, players);

        if(otherCharacters.length > 0){
          console.log("There are already other characters from this player in the group "+JSON.stringify(otherCharacters))
        }
        else{
          playerBuild = [...playerBuild,newPlayer]
          setPlayers(playerBuild)
        }
      }
      updateRosterStatus(newPlayer, roster)
      saveCurrentBuild(playerBuild, name === "New Build"? "currentBuild": name)
  };

  const getOtherCharacters = (player: BuildPlayer, players: BuildPlayer[]): BuildPlayer[] => {
    return players.filter((otherPlayer) => {
      return (otherPlayer.main === player.name || otherPlayer.name === player.main || otherPlayer.main === player.main) &&
      otherPlayer.id !== player.id
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
    ].sort((a,b) => a.name.localeCompare(b.name))


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

  const updateRosterStatus = async (player: BuildPlayer, roster: BuildPlayer[]) : Promise<BuildPlayer[]> => {
    for (const rosterPlayer of roster) {
      if(rosterPlayer.id === player.id){
        if(player.group === "roster"){
          console.log("Updating status of "+JSON.stringify(rosterPlayer)+" to unknown");
          rosterPlayer.status = InviteStatus.Unknown;
          const otherCharacters = getOtherCharacters(player, roster);
          for(const otherCharacter of otherCharacters){
            console.log("Updating status of "+JSON.stringify(otherCharacter)+" to unknown");
            otherCharacter.status = InviteStatus.Unknown;
          }
        }
        else if(player.group === "bench"){
          console.log("Updating status of "+JSON.stringify(rosterPlayer)+" to benched");
          rosterPlayer.status = InviteStatus.Benched;
        }
        else{
          console.log("Updating status of "+JSON.stringify(rosterPlayer)+" to accepted");
          rosterPlayer.status = InviteStatus.Accepted;
          const otherCharacters = getOtherCharacters(player, roster);
          for(const otherCharacter of otherCharacters){
            console.log("Updating status of "+JSON.stringify(otherCharacter)+" to declined");
            otherCharacter.status = InviteStatus.Declined;
          }
        }
      }
    }
    return roster;
  }

  const saveCurrentBuild = async (playerBuild : BuildPlayer[], buildName?: string) => {
    const connectionString = CONNECTION_STRING;
    connectionString.build = buildName?? "currentBuild";
    console.log(connectionString)
    BuildHelper.parseSqlBuildSave(connectionString, playerBuild);
  }

  const saveCurrentRoster = async (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSqlRosterSave(CONNECTION_STRING, playerBuild);
  }

  const deleteFromRoster = async (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSqlRosterDeletePlayers(CONNECTION_STRING, playerBuild);
  }

  const getCurrentBuild = () => {
    return {
      buildId,
      name: name ?? common("build.unnamed"),
      players,
    } as Build;
  };

  const getCurrentRoster = () => {
    return {
      buildId,
      name: common("build.roster"),
      players: roster
    } as Build;
  };

  const saveBuild = async () => {
    if (!players.length) return;
    saveCurrentBuild(getCurrentBuild().players, name);
  };

  const resetBuild = async () => {
    const connectionString = CONNECTION_STRING;
    const currentBuild = localStorage.getItem('LastBuild')?? "currentBuild"
    connectionString.build = currentBuild;
    setName(currentBuild);
    setPlayers([]);
    await saveCurrentBuild([], currentBuild).then(() => {
      BuildHelper.parseSqlDelete(connectionString)
    });
    localStorage.removeItem('LastBuild')
  };

  const handleTitleChange = (newName: string) => {
    setName(newName);
    localStorage.setItem( 'LastBuild', newName)
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer) => {
    if (openEditModal) {
      openEditModal(player);
    }
  };

  const loadBuildSql = async(build: string): Promise<void> => {
    const connectionString = CONNECTION_STRING;
    connectionString.build = build;
    BuildHelper.parseSqlLoad(connectionString).then((build) => {
      if(build.length > 0){
        loadBuild(build)}
      }
    )
  }

  const loadRoster = async (newRoster: BuildPlayer[]): Promise<void> => {
    setRoster([...newRoster]);
  };

  const loadBuild = async (newPlayers: BuildPlayer[]): Promise<void> => {
    setPlayers([...newPlayers]);
  };

  const handleChangeGrouping = () => {
    setGrouped(!grouped);
  };

  useEffect(() => {
    if (buildId) {
      getBuild(buildId)
        .then(({ data: { name , players } }) => {
          setName(name);
          setPlayers(players);
          setIsLoading(false);
        })
        .catch(handleError);
    } else {
      const lastBuild = localStorage.getItem( 'LastBuild')?? 'New Build';
      setName(lastBuild);
      const connectionString = CONNECTION_STRING;
      connectionString.build = lastBuild;
      BuildHelper.parseSqlLoad(CONNECTION_STRING).then((build) => {
          loadBuild(build).then(() => {
            BuildHelper.parseSqlImport(CONNECTION_STRING).then((roster) => {
                loadRoster(roster).then(() => {
                  for(const player of build){
                    updateRosterStatus(player, roster)
                  }
                });
            })
          });
      })

      setIsLoading(false);
    }// eslint-disable-next-line
  }, [buildId, handleError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importPlayer, saveBuild, resetBuild, getCurrentBuild, editPlayer, loadRoster, loadBuildSql, addToRoster, removeFromRoster, getCurrentRoster }}>
      <ModalAdd editPlayer={editPlayerModalFn} />

      <Container sx={{ height:'1100px', minHeight: "80%", display: 'flex', justifyContent:'flex-start' }} maxWidth={false}>
        <Box key={UUID()} minWidth={"25%"} css={[styles.gridBox, styles.scroll]}>
            <Roster build={getCurrentRoster()} editing />
        </Box>
        <Container sx={{ maxWidth:'75%'}} maxWidth={false}>
        <Box key={UUID()} css={[styles.gridBox, styles.header]}>
          <BuildTitle
            css={styles.buildTitle}
            key={UUID()}
            title={name}
            onChange={handleTitleChange}
          />
          <BuildRolesCount key={UUID()} build={getCurrentBuild()} />
        </Box>

        <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
          <ModalAdd />
          <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping}/>
          <ModalSaveBuild />
          <ModalLoadRoster />
          <ModalLoadRosterSQL />
          <ModalLoadBuild />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidComposition build={getCurrentBuild()} editing grouped={grouped} />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidChecklist build={getCurrentBuild()} />
        </Box>
        <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
          <ModalImport />
          <ModalResetBuild />
        </Box>
        </Container>
      </Container>
    </AppContextProvider>
  );
};

export default EditBuildPage;
