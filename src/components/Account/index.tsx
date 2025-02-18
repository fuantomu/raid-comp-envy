/** @jsxImportSource @emotion/react */
import { Box, Button, Container, Input, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./useStyles";
import { getHash } from "../../utils/hash";
import { RosterProvider } from "../../utils/RosterProvider";
import UUID from "../../utils/UUID";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";

export type Props = {};

const Account: FC<Props> = () => {
  const [common] = useTranslation("common");
  const styles = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, showError] = useState(false);
  const [empty, showEmpty] = useState(false);
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    if (!username || !password) {
      showEmpty(true);
      return;
    }
    e.preventDefault();
    const hash = getHash(username, password);
    RosterProvider.saveAccountLogin(username, JSON.stringify({ hash })).then((response) => {
      if (response === -1) {
        showError(true);
      } else {
        setCreated(true);
      }
    });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      return handleSubmit(e);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (created) {
    return (
      <Container key={UUID()}>
        <Box key={UUID()} display={"flex"} css={{ justifyContent: "center", marginTop: "10%" }}>
          <Typography style={{ caretColor: "transparent" }} fontSize={"38px"} variant="subtitle1">
            {common(`account.created`)}
          </Typography>
        </Box>
        <Box display={"flex"} css={{ marginTop: "80%", justifyContent: "center" }}>
          <Button
            color="primary"
            variant="contained"
            css={{ width: "300px", height: "120px" }}
            onClick={handleGoBack}
          >
            <Typography style={{ caretColor: "transparent" }} fontSize={"38px"} variant="subtitle1">
              {common(`account.gotologin`)}
            </Typography>
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box>
        <Logo></Logo>
      </Box>
      <Box css={styles.modal}>
        <h2>{common("account.title")}</h2>
        <Box css={styles.content}>
          <Box css={styles.nameInputWrapper}>
            <h4>{common("login.user")}</h4>
            <Input
              id="username"
              css={styles.nameInput}
              type="text"
              autoFocus={true}
              onChange={(e) => {
                setUserName(e.target.value);
                showError(false);
                showEmpty(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <h4>{common("login.password")}</h4>
            <Input
              id="password"
              css={styles.nameInput}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                showEmpty(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <h4 style={{ color: "red" }}>{error ? common("account.error") : null}</h4>
            <h4 style={{ color: "red" }}>{empty ? common("account.empty") : null}</h4>
            <Box display={"flex"} css={{ justifyContent: "center" }}>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                {common("account.submit")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Account;
