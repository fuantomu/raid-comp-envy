/** @jsxImportSource @emotion/react */
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleChangeGrouping = () => {
    setShouldUpdate(!shouldUpdate);
    setIsLoading(true);
    navigate(
      `/build${grouped ? "" : "/g"}/${buildId}/${BuildHelper.humanReadableURL(build?.name!)}`
    );
  };

  const handleEditBuild = () => {
    navigate(`/build/${buildId}/edit`);
  };

  useEffect(() => {
    if (buildId) {
      getBuild(buildId)
        .then(({ data }) => {
          setBuild(data);
          setIsLoading(false);
        })
        .catch(handleError);
    }
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

