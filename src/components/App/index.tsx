/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../../utils/i18n";
import useStyles from "./useStyles";
import Login from "../Login";
import { RosterProvider } from "../../utils/RosterProvider";
import UUID from "../../utils/UUID";
import useErrorHandler from "../../utils/useErrorHandler";
import Account from "../Account";
import { accountRoleTimeouts } from "../../consts";
import LogoutTimer from "../LogoutTimer";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createDragDropManager } from "dnd-core";
import { Button, Tooltip } from "@mui/material";
import { Logout } from "@mui/icons-material";
import StickyBox from "react-sticky-box";
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const [token, setToken] = useState(localStorage.getItem("token") ?? undefined);
  const [host] = useState(localStorage.getItem("host") ?? UUID());
  const [issueTime, setIssueTime] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountRole, setAccountRole] = useState(-1);
  const [newAccount, setNewAccount] = useState(false);
  const [accountName, setAccountName] = useState("");
  const handleError = useErrorHandler();
  const manager = createDragDropManager(HTML5Backend);

  const logout = () => {
    setToken(undefined);
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    if (!loggedIn && issueTime === 0) {
      RosterProvider.getLoginAge(host)
        .then((response) => {
          if (response.created_date > 0) {
            setIssueTime(response.created_date);
            setAccountRole(response.role);
            setAccountName(response.username);
            const timeDifference = (new Date().getTime() - response.created_date) / 1000;
            if (timeDifference <= parseFloat(accountRoleTimeouts[response.role])) {
              const newToken = UUID();
              localStorage.setItem("token", newToken);
              localStorage.setItem("host", host);
              setToken(newToken);
              setLoggedIn(true);
              return;
            }
          }
          logout();
        })
        .catch(handleError);
    }
    const interval = setInterval(() => {
      if (loggedIn) {
        const newTime = (new Date().getTime() - issueTime) / 1000;

        if (newTime >= parseFloat(accountRoleTimeouts[accountRole])) {
          logout();
          RosterProvider.deleteLogin(host);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleError, loggedIn]);

  if (window.location.pathname === "/account" && !newAccount) {
    return <Account setNewAccount={setNewAccount}></Account>;
  }
  if (!token || issueTime === 0) {
    return (
      <Login
        setToken={setToken}
        setIssueTime={setIssueTime}
        setLoggedIn={setLoggedIn}
        setRole={setAccountRole}
        setAccountName={setAccountName}
        host={host}
      />
    );
  }
  return (
    <Fragment>
      <Box css={style.content} test-id="mui-root">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="*"
                element={
                  <EditBuildPage
                    accountName={accountName}
                    accountRole={accountRole}
                    manager={manager}
                  />
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
      <StickyBox
        style={{
          width: "100%",
          background: "#1d1d1d",
          left: "0",
          bottom: "0"
        }}
      >
        <Box display={"grid"} sx={{ width: "100%", border: "1px solid black" }}>
          <Tooltip title={"Logout"}>
            <Button onClick={logout}>
              <Box>
                <Box>{`Currently logged in as ${accountName}`}</Box>
                <Logout />
              </Box>
            </Button>
          </Tooltip>
        </Box>
        <Box sx={{ width: "100%" }}>
          <LogoutTimer issueTime={issueTime} accountRole={accountRole}></LogoutTimer>
        </Box>
      </StickyBox>
    </Fragment>
  );
};

export default App;
