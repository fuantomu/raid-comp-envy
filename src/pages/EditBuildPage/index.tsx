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
import { PlayerUtils } from "../../utils/PlayerUtils";
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

  const importBuild = async (newPlayers: BuildPlayer[]): Promise<void> => {
    for(const newPlayer of newPlayers){
      console.log(players.find((player) => newPlayer.main === player.main && newPlayer.name !== player.name))
      if(players.find((player) => newPlayer.main === player.main && newPlayer.name !== player.name && player.group !== 'roster')){
        newPlayers = newPlayers.filter((player) => player.name !== newPlayer.name)
      }
    }

    if(!newPlayers || newPlayers.length === 0){
      return
    }

    const playerBuild = [
      ...players.filter((player) => {
        player.status = InviteStatus.Unknown;
        return newPlayers.find(
          (newPlayer) =>
            (newPlayer.oldName ?? PlayerUtils.getFullName(newPlayer)) !==
            PlayerUtils.getFullName(player)
        );
      }),
      ...newPlayers.filter((player) => {player.status = InviteStatus.Unknown; return player.name !== "";}),
    ].sort((a,b) => a.name.localeCompare(b.name))
    setPlayers([...playerBuild]);

    const rosterBuild = [
      ...newPlayers.filter(() => {
        return newPlayers.find(
          (newPlayer) =>
            newPlayer.group === 'roster'
        );
      })
    ].sort((a,b) => a.name.localeCompare(b.name))

    if(rosterBuild.length > 0){
      for (const rosterPlayer of rosterBuild){
        addToRoster(rosterPlayer)
      }
    }
    else{
      updateRosterStatus(newPlayers, roster);
    }


    saveCurrentBuild([...playerBuild], name === "New Build"? "currentBuild": name)
  };

  const addToRoster = async (newPlayer: BuildPlayer): Promise<void> => {
    const rosterBuild = [
      ...roster.filter((player : BuildPlayer) => {
        return (newPlayer.oldName ?? newPlayer.name) !== player.name
      }),
      newPlayer
    ].sort((a,b) => a.name.localeCompare(b.name))
    setRoster([...rosterBuild]);
    updateRosterCharacters([newPlayer], rosterBuild).then(() => {
        updateRosterStatus([newPlayer], rosterBuild);
        saveCurrentRoster([newPlayer]);
    })
  }

  const removeFromRoster = async (removedPlayer: BuildPlayer): Promise<void> => {
    const rosterBuild = [
      ...roster.filter((player : BuildPlayer) => {
        return (removedPlayer.oldName ?? PlayerUtils.getFullName(removedPlayer)) !== PlayerUtils.getFullName(player)
      })
    ].sort((a,b) => a.name.localeCompare(b.name))
    setRoster([...rosterBuild]);
    updateRosterCharacters([removedPlayer], roster).then(() => {
        deleteFromRoster([removedPlayer]);
    })
  }

  const updateRosterStatus = async (players: BuildPlayer[], roster: BuildPlayer[]) : Promise<BuildPlayer[]> => {
    for (const rosterPlayer of roster) {
      const player = players.find((player) => player.name === rosterPlayer.name)
      if(player){
        if(player.group === "roster"){
          rosterPlayer.status = InviteStatus.Unknown;
        }
        else if(player.group === "bench"){
          rosterPlayer.status = InviteStatus.Benched;
        }
        else{
          if(rosterPlayer.class === player.class && rosterPlayer.spec === player.spec){
            rosterPlayer.status = InviteStatus.Accepted;
          }
          if(rosterPlayer.class !== player.class || rosterPlayer.spec !== player.spec){
            rosterPlayer.status = InviteStatus.Declined;
          }
        }
      }
    }
    return roster;
  }

  const updateRosterCharacters = async (players: BuildPlayer[], roster: BuildPlayer[]) : Promise<BuildPlayer[]> => {
    for (const rosterPlayer of roster) {
      const player = players.find((player) => player.oldName === rosterPlayer.name)
      if(player){
        if(rosterPlayer.class !== player.class){
          rosterPlayer.class = player.class;
        }
        if(rosterPlayer.spec !== player.spec){
          rosterPlayer.spec = player.spec;
        }
        if(rosterPlayer.main !== player.main){
          rosterPlayer.main = player.main;
        }
      }
    }
    return roster;
  }

  const saveCurrentBuild = async (playerBuild : BuildPlayer[], buildName?: string) => {
    const connectionString = CONNECTION_STRING;
    connectionString.build = buildName?? "currentBuild";
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
    setName(common("build.new"));
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
                  updateRosterStatus(build, roster).then((rosterUpdate) => {
                    setRoster(rosterUpdate);
                  });
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
    <AppContextProvider value={{ importBuild, saveBuild, resetBuild, getCurrentBuild, editPlayer, loadRoster, loadBuildSql, addToRoster, removeFromRoster, getCurrentRoster }}>
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
