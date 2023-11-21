/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
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
import { getBuild, postBuild } from "../../services/backend";
import { Build, BuildPlayer} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { PlayerUtils } from "../../utils/PlayerUtils";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import ModalLoadRoster from "../../components/ModalLoadRoster";
import ModalLoadRosterSQL from "../../components/ModalLoadRosterSQL";
import { InviteStatus } from "../../consts";

export interface EditBuildPageProps {}

const EditBuildPage: FC<EditBuildPageProps> = () => {
  const [common] = useTranslation("common");
  const { buildId } = useParams<{ buildId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();
  const handleError = useErrorHandler();
  const navigate = useNavigate();
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
    "players" : undefined
  };

  const importBuild = async (newPlayers: BuildPlayer[]): Promise<void> => {
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
    ]
    setPlayers(playerBuild)
    updateRosterStatus(newPlayers, roster);
    saveCurrentBuild(playerBuild)
  };

  const updateRosterStatus = async (players: BuildPlayer[], roster: BuildPlayer[]) : Promise<BuildPlayer[]> => {
    for (const rosterPlayer of roster) {
      const player = players.find((player) => player.name === rosterPlayer.name)
      if(player){

        if(player.group === "roster"){
          rosterPlayer.status = InviteStatus.Unknown;
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

  const saveCurrentBuild = (playerBuild : BuildPlayer[]) => {
    BuildHelper.parseSqlSave(CONNECTION_STRING, playerBuild);
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
    setIsLoading(true);
    postBuild(getCurrentBuild())
      .then(({ data: { buildId } }) => {
        navigate(`/build/${buildId}/${BuildHelper.humanReadableURL(name)}`);
      })
      .catch(handleError);
  };

  const resetBuild = async () => {
    setName(common("build.new"));
    setPlayers([]);
    saveCurrentBuild([]);
  };

  const handleTitleChange = (newName: string) => {
    setName(newName);
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer) => {
    if (openEditModal) {
      openEditModal(player);
    }
  };

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
        .then(({ data: { name, players } }) => {
          setName(name);
          setPlayers(players);
          setIsLoading(false);
        })
        .catch(handleError);
    } else {
      BuildHelper.parseSqlLoad(CONNECTION_STRING).then((build) => {
        if(build.length > 0 && build[0].name !== "ErrorInvalidID"){
          loadBuild(build).then(() => {
            BuildHelper.parseSqlImport(CONNECTION_STRING).then((roster) => {
              if(roster.length > 0 && roster[0].name !== "ErrorInvalidID"){
                loadRoster(roster).then(() => {
                  updateRosterStatus(build, roster).then((rosterUpdate) => {
                    setRoster(rosterUpdate);
                  });
                });
              }
            })
          });
        }
      })

      setIsLoading(false);
    }// eslint-disable-next-line
  }, [buildId, handleError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importBuild, saveBuild, resetBuild, getCurrentBuild, editPlayer, loadRoster }}>
      <ModalAdd editPlayer={editPlayerModalFn} />
      <Container maxWidth="xl">
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
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidComposition build={getCurrentBuild()} editing grouped={grouped} />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <Roster build={getCurrentRoster()} editing />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidChecklist build={getCurrentBuild()} />
        </Box>
        <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
          <ModalImport />
          <ModalResetBuild />
        </Box>
      </Container>
    </AppContextProvider>
  );
};

export default EditBuildPage;
