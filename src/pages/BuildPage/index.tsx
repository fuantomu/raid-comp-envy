/** @jsxImportSource @emotion/react */
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import BuildRolesCount from "../../components/BuildRolesCount";
import ChangeViewModeButton from "../../components/ChangeViewModeButton";
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

const BuildPage: FC<BuildPageProps> = ({ grouped: baseGrouped }) => {
  const { buildId } = useParams<{ buildId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [build, setBuild] = useState<Build>();
  const handleError = useErrorHandler();
  const styles = useStyles();
  const navigate = useNavigate();
  const [common] = useTranslation("common");
  const [grouped, setGrouped] = useState(!!baseGrouped);

  const handleChangeGrouping = () => {
    navigate(
      `/build${grouped ? "" : "/g"}/${buildId}/${BuildHelper.humanReadableURL(build?.name!)}`
    );
    setGrouped(!grouped);
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
  }, [buildId, handleError]);

  if (isLoading) {
    return <Loading />;
  }

  if (!build) {
    throw new AppError(AppErrorId.Api404);
  }

  return (
    <Container>
      <Box key={UUID()} css={[styles.gridBox, styles.header]}>
        <Typography style={{caretColor: "transparent"}} variant="h4" gutterBottom css={styles.headerText}>
          {build.name}
        </Typography>
        <BuildRolesCount css={styles.rolesCount} key={UUID()} build={build} />
      </Box>
      <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
        <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping} />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidComposition build={build} grouped={grouped} />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidChecklist build={build} />
      </Box>
      <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
        <ModalExport build={build} />
        <Tooltip title={common("cta.editBuild")} placement="top" arrow>
          <Button color="info" variant="contained" size="large" onClick={handleEditBuild}>
            <EditIcon />
          </Button>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default BuildPage;
