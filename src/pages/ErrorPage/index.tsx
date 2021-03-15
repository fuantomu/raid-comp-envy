/** @jsxImportSource @emotion/react */
import { Box, Button, Container, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useErrorBoundary } from "../../components/ErrorBoundary/context";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";

export interface ErrorPageProps {
  error: Error;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const errorBoundary = useErrorBoundary();
  const [common] = useTranslation("common");
  const styles = useStyles();
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  const handleReload = () => {
    errorBoundary?.reset();
  };

  return (
    <Container css={styles.gridBox}>
      <Box css={styles.box}>
        <Typography css={styles.header} variant="h2">
          {common(`error.${error.message}`)}
        </Typography>
        <Button
          css={styles.button}
          key={UUID()}
          color="primary"
          variant="contained"
          size="large"
          onClick={handleGoBack}
        >
          {common("error.goBack")}
        </Button>
        <Button
          css={styles.button}
          key={UUID()}
          color="secondary"
          variant="contained"
          size="large"
          onClick={handleReload}
        >
          {common("error.reload")}
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
