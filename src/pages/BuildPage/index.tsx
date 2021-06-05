/** @jsxImportSource @emotion/react */
import { Box, Button, Container, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import BuildRolesCount from "../../components/BuildRolesCount";
import Loading from "../../components/Loading";
import ModalExport from "../../components/ModalExport";
import RaidChecklist from "../../components/RaidChecklist";
import RaidComposition from "../../components/RaidComposition";
import { AppErrorId } from "../../consts";
import { getBuild } from "../../services/backend";
import { Build } from "../../types";
import AppError from "../../utils/AppError";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";

export interface BuildPageProps {
  grouped?: boolean;
}

const BuildPage: FC<BuildPageProps> = ({ grouped }) => {
  const { buildId } = useParams<{ buildId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [build, setBuild] = useState<Build>();
  const handleError = useErrorHandler();
  const styles = useStyles();
  const history = useHistory();
  const [common] = useTranslation("common");
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleChangeGrouping = () => {
    setShouldUpdate(!shouldUpdate);
    setIsLoading(true);
    history.push(
      `${common(
        grouped ? "urls.build" : "urls.buildGrouped"
      )}/${buildId}/${BuildHelper.humanReadableURL(build?.name!)}`
    );
  };

  const handleEditBuild = () => {
    history.push(`${common("urls.build")}/${buildId}${common("urls.edit")}`);
  };

  useEffect(() => {
    getBuild(buildId)
      .then(({ data }) => {
        setBuild(data);
        setIsLoading(false);
      })
      .catch(handleError);
  }, [shouldUpdate, buildId, handleError]);

  if (isLoading) {
    return <Loading />;
  }

  if (!build) {
    throw new AppError(AppErrorId.Api404);
  }

  return (
    <Container>
      <Box key={UUID()} css={[styles.gridBox, styles.header]}>
        <Typography variant="h4" gutterBottom css={styles.headerText}>
          {build.name}
        </Typography>
        <BuildRolesCount
          css={styles.rolesCount}
          key={UUID()}
          handleChangeGrouping={handleChangeGrouping}
          build={build}
        />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidComposition build={build} grouped={!!grouped} />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidChecklist build={build} />
      </Box>
      <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
        <ModalExport build={build} />
        <Button color="primary" variant="contained" size="large" onClick={handleEditBuild}>
          <EditIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default BuildPage;
