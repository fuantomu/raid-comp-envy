/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBuild } from "../../services/backend";
import useErrorHandler from "../../utils/useErrorHandler";
import { Build, BuildPlayer } from "../../types";
import AppError from "../../utils/AppError";
import { AppErrorId, WarcraftPlayerSpec } from "../../consts";
import { IconProvider } from "../../utils/IconProvider";
import RaidComposition from "../../components/RaidComposition";
import { Box, Container, Typography } from "@material-ui/core";
import { css } from "@emotion/react";
import RaidChecklist from "../../components/RaidChecklist";
import useTheme, { Spacing } from "../../utils/useTheme";

const BuildPage: FC = () => {
  const { buildId } = useParams<{ buildId?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [build, setBuild] = useState<Build>();
  const history = useHistory();
  const [common] = useTranslation("common");
  const handleError = useErrorHandler();
  const theme = useTheme();

  useEffect(() => {
    if (!buildId) {
      history.push(common("urls.home"));
    } else {
      getBuild(buildId)
        .then(({ data }) => {
          setBuild(data);
          setIsLoading(false);
        })
        .catch(handleError);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!build) {
    throw new AppError(AppErrorId.Api404);
  }

  return (
    <Container>
      <Box style={{ margin: `${theme.spacing(Spacing.m)} auto` }}>
        <Typography variant="h4" gutterBottom>
          Greatest team ever
        </Typography>
      </Box>
      <Box>
        <RaidComposition build={build} />
      </Box>
      <Box style={{ margin: `${theme.spacing(Spacing.m)} auto` }}>
        <RaidChecklist build={build} />
      </Box>
    </Container>
  );
};

export default BuildPage;
