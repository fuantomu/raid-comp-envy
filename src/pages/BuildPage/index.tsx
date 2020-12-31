/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { getBuild } from "../../services/backend";
import useErrorHandler from "../../utils/useErrorHandler";
import { Build } from "../../types";
import AppError from "../../utils/AppError";
import { AppErrorId } from "../../consts";
import RaidComposition from "../../components/RaidComposition";
import { Box, Container, Typography } from "@material-ui/core";
import RaidChecklist from "../../components/RaidChecklist";
import useStyles from "./useStyles";
import UUID from "../../utils/UUID";
import BuildRolesCount from "../../components/BuildRolesCount";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    history.push(`${common(grouped ? "urls.build" : "urls.buildGrouped")}/${buildId}`);
  };

  useEffect(() => {
    getBuild(buildId)
        .then(({ data }) => {
          setBuild(data);
          setIsLoading(false);
        })
        .catch(handleError);
  }, [shouldUpdate]);

  if (isLoading) {
    return <Loading />;
  }


  if (!build) {
    throw new AppError(AppErrorId.Api404);
  }

  return (
    <Container>
      <Box key={UUID()} css={[styles.gridBox, styles.header]}>
        <Typography variant="h4" gutterBottom>
          {build.name}
        </Typography>
        <BuildRolesCount key={UUID()} handleChangeGrouping={handleChangeGrouping} build={build} />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidComposition build={build} grouped={!!grouped} />
      </Box>
      <Box key={UUID()} css={styles.gridBox}>
        <RaidChecklist build={build} />
      </Box>
    </Container>
  );
};

export default BuildPage;
