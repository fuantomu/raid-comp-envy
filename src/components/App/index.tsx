/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { Button, MenuItem, TextField, Tooltip } from "@mui/material";
import { Logout } from "@mui/icons-material";
import StickyBox from "react-sticky-box";
import cataclysm from "../../icons/Cata.png";
import mop from "../../icons/Mop.png";
import wotlk from "../../icons/Wotlk.png";
import { useTranslation } from "react-i18next";
import HomePage from "../../pages/HomePage";
import { LoggedInUser, MessageData } from "../../types";
import { socketId, useUpdateSocketContext } from "../UpdateSocket/context";
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
  const [host] = useState(localStorage.getItem("host") ?? UUID());
  const [issueTime, setIssueTime] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountRole, setAccountRole] = useState(-1);
  const [accountName, setAccountName] = useState("");
  const handleError = useErrorHandler();
  const manager = createDragDropManager(HTML5Backend);
  const changeVersionRef = useRef<any>();
  const [common] = useTranslation("common");
  const [selectedVersion, setSelectedVersion] = useState(
    localStorage.getItem("LastVersion") ?? "Wotlk"
  );
  const navigate = useNavigate();
  const [users, setUsers] = useState<LoggedInUser[]>([]);
  const webSocket = useUpdateSocketContext((message: MessageData) => {
    if (message.message_type === "users") {
      const newUsers: LoggedInUser[] = JSON.parse(message.data);
      setUsers(newUsers);
    } else if (message.message_type === "login") {
      const newUsers: LoggedInUser[] = JSON.parse(message.data);
      setUsers(newUsers);
    } else if (message.message_type === "logout") {
      const newUsers: LoggedInUser[] = users.filter((user) => user.host !== message.data["host"]);
      setUsers([...newUsers]);
    }
  }, true);

  const message = {
    socketId,
    message_type: "",
    data: {},
    account_name: accountName,
    date: new Date().getTime(),
    version: "System"
  };

  const logout = () => {
    RosterProvider.deleteLogin(host).then(() => {
      setToken(null);
      localStorage.removeItem("token");
      setLoggedIn(false);
      navigate("/login");
      const newUsers = users.filter((user) => user.host !== host);
      setUsers([...newUsers]);
      message.data = { host: host, username: accountName };
      message.message_type = "logout";
      webSocket.sendMessage(JSON.stringify(message));
    });
  };

  const login = (username) => {
    const newToken = UUID();
    localStorage.setItem("token", newToken);
    localStorage.setItem("host", host);
    setToken(newToken);
    setLoggedIn(true);
    message.data = { host: host, username: username };
    message.message_type = "login";
    setUsers([{ host: host, username: username }]);
    webSocket.sendMessage(JSON.stringify(message));
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
              login(response.username);
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
        }
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleError, loggedIn]);

  if (
    (!token || issueTime < 0) &&
    window.location.pathname !== "/account" &&
    window.location.pathname !== "/login"
  ) {
    window.location.pathname = "/login";
  }

  return (
    <Fragment>
      <Box css={style.content} test-id="mui-root">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route
                path="/login"
                element={
                  <Login
                    setIssueTime={setIssueTime}
                    setRole={setAccountRole}
                    setAccountName={setAccountName}
                    host={host}
                    login={login}
                  />
                }
              />
              <Route
                path="/edit"
                element={
                  <EditBuildPage
                    accountName={accountName}
                    accountRole={accountRole}
                    manager={manager}
                    changeVersionRef={changeVersionRef}
                  />
                }
              />
              <Route path="/home" element={<HomePage changeVersionRef={changeVersionRef} />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
      {loggedIn &&
      window.location.pathname !== "/account" &&
      window.location.pathname !== "/login" ? (
        <StickyBox
          style={{
            background: "#1d1d1d",
            height: "116px"
          }}
          bottom={true}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"0.5fr 0.5fr 4fr auto"}
            sx={{ width: "100%", border: "1px solid black", height: "95px" }}
          >
            <Button
              sx={{ borderRight: "1px solid black", height: "95px" }}
              onClick={() => navigate("/home")}
            >
              Home
            </Button>
            <Button
              sx={{ borderRight: "1px solid black", height: "95px" }}
              onClick={() => navigate("/edit")}
            >
              Planner
            </Button>
            <Tooltip title={"Logout"}>
              <Button sx={{ height: "95px" }} onClick={logout}>
                <Box>
                  <Box>{`Currently logged in as ${accountName}`}</Box>
                  <Logout />
                </Box>
              </Button>
            </Tooltip>
            <TextField
              defaultValue="Wotlk"
              value={selectedVersion}
              onChange={(e) => {
                changeVersionRef.current?.handleChangeVersion(e.target.value);
                setSelectedVersion(e.target.value);
              }}
              select // tell TextField to render select
              label="Game Version"
              size="small"
            >
              <MenuItem id={"Wotlk"} value={"Wotlk"}>
                <img width={"125"} height={"75"} alt={common(`version.Wotlk`)} src={wotlk} />
              </MenuItem>
              <MenuItem id={"Cataclysm"} value={"Cataclysm"}>
                <img
                  width={"125"}
                  height={"75"}
                  alt={common(`version.Cataclysm`)}
                  src={cataclysm}
                />
              </MenuItem>
              <MenuItem id={"Mop"} disabled value={"Mop"}>
                <img width={"125"} height={"75"} alt={common(`version.Mop`)} src={mop} />
              </MenuItem>
            </TextField>
          </Box>
          <Box sx={{ height: "16px" }} display={"grid"} gridTemplateColumns={"auto 4fr"}>
            <Box marginLeft={"16px"}>
              <Tooltip title={users.map((user) => user.username).join(",")}>
                <Box>{`Active Users: ${users.length}`}</Box>
              </Tooltip>
            </Box>
            <Box>
              <LogoutTimer issueTime={issueTime} accountRole={accountRole}></LogoutTimer>
            </Box>
          </Box>
        </StickyBox>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default App;
