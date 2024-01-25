/** @jsxImportSource @emotion/react */
import { Box, Button, Container, Input } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./useStyles";
import { getHash } from "../../utils/hash";
import { RosterProvider } from "../../utils/RosterProvider";
import UUID from "../../utils/UUID";
import Logo from "../Logo";

export type Props = {
  setToken: Dispatch<SetStateAction<string>>;
  setIssueTime: Dispatch<SetStateAction<number>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setRole: Dispatch<SetStateAction<number>>;
  setAccountName: Dispatch<SetStateAction<string>>;
  host: string;
};

const Login: FC<Props> = ({
  setToken,
  setIssueTime,
  setLoggedIn,
  setRole,
  setAccountName,
  host
}) => {
  const [common] = useTranslation("common");
  const styles = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, showError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const hash = getHash(username, password);
    RosterProvider.getAccountLogin(username, hash).then((response) => {
      if (response === -1) {
        setToken("");
        setIssueTime(0);
        setLoggedIn(false);
        showError(true);
      } else {
        const newToken = UUID();
        localStorage.setItem("token", newToken);
        localStorage.setItem("host", host);
        setAccountName(username);
        setToken(newToken);
        setIssueTime(new Date().getTime());
        setLoggedIn(true);
        setRole(response);
        RosterProvider.saveLoginAge(host, JSON.stringify({ role: response, username }));
      }
    });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      return handleSubmit(e);
    }
  };

  return (
    <Container maxWidth="xl">
      <Logo></Logo>
      <Box css={styles.modal}>
        <h2>{common("login.title")}</h2>
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
              }}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />
            <h4>{common("login.password")}</h4>
            <Input
              id="password"
              css={styles.nameInput}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                showError(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <h4 style={{ color: "red" }}>{error ? common("login.error") : null}</h4>
            <Box display={"flex"} css={{ justifyContent: "center" }}>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                {common("login.submit")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
