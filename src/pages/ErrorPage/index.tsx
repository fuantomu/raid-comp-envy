/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleReload = () => {
    localStorage.removeItem("LastBuild")
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
