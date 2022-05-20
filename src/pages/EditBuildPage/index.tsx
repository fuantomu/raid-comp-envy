/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextProvider } from "../../components/App/context";
import BuildRolesCount from "../../components/BuildRolesCount";
import BuildTitle from "../../components/BuildTitle";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import ModalImport from "../../components/ModalImport";
import ModalResetBuild from "../../components/ModalResetBuild";
import ModalSaveBuild from "../../components/ModalSaveBuild";
import RaidChecklist from "../../components/RaidChecklist";
import RaidComposition from "../../components/RaidComposition";
import { getBuild, postBuild } from "../../services/backend";
import { Build, BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { PlayerUtils } from "../../utils/PlayerUtils";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";

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
  let openEditModal: any = () => {};

  const importBuild = async (newPlayers: BuildPlayer[]): Promise<void> => {
    setPlayers([
      ...players.filter((player) => {
        return newPlayers.find(
          (newPlayer) =>
            (newPlayer.oldName ?? PlayerUtils.getFullName(newPlayer)) !==
            PlayerUtils.getFullName(player)
        );
      }),
      ...newPlayers.filter((player) => player.name !== ""),
    ]);
  };

  const getCurrentBuild = () => {
    return {
      buildId,
      name: name ?? common("build.unnamed"),
      players,
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
      setIsLoading(false);
    }
  }, [buildId, handleError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importBuild, saveBuild, resetBuild, getCurrentBuild, editPlayer }}>
      <ModalAdd editPlayer={editPlayerModalFn} />
      <Container>
        <Box key={UUID()} css={[styles.gridBox, styles.header]}>
          <BuildTitle
            css={styles.buildTitle}
            key={UUID()}
            title={name}
            onChange={handleTitleChange}
          />
          <BuildRolesCount key={UUID()} handleChangeGrouping={() => {}} build={getCurrentBuild()} />
        </Box>
        <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
          <ModalAdd />
          <ModalImport />
          <ModalSaveBuild />
          <ModalResetBuild />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidComposition build={getCurrentBuild()} grouped editing />
        </Box>
        <Box key={UUID()} css={styles.gridBox}>
          <RaidChecklist build={getCurrentBuild()} />
        </Box>
      </Container>
    </AppContextProvider>
  );
};

export default EditBuildPage;
