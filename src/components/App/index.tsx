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
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const [token, setToken] = useState(localStorage.getItem("token")?? undefined);
  const [host, ] = useState(localStorage.getItem("host")?? UUID())
  const [issueTime, setIssueTime] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [accountRole, setAccountRole] = useState(-1)
  const [newAccount, setNewAccount] = useState(false)
  const handleError = useErrorHandler();



  useEffect(() => {
    if(!loggedIn && issueTime === 0){
      RosterProvider.getLoginAge(host).then((response) => {
        if(response.createdDate > 0){
          setIssueTime(response.createdDate);
          setAccountRole(response.role)
          const timeDifference = (new Date().getTime() - response.createdDate)/1000;
          if (timeDifference <= parseFloat(accountRoleTimeouts[response.role])){
            const newToken = UUID();
            localStorage.setItem("token", newToken)
            localStorage.setItem("host", host)
            setToken(newToken);
            setLoggedIn(true);
            return
          }
        }
        setToken(undefined)
        localStorage.removeItem("token")
      }).catch(handleError);
    }
    const interval = setInterval(() => {
      if(loggedIn){
        const newTime = (new Date().getTime() - issueTime)/1000

        if(newTime >= parseFloat(accountRoleTimeouts[accountRole])){
          setToken(undefined)
          setLoggedIn(false)
          localStorage.removeItem("token")
          RosterProvider.deleteLogin(host)
        }
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[handleError,loggedIn]);

  if(window.location.pathname === "/account" && !newAccount){
    return (<Account setNewAccount={setNewAccount}></Account>)
  }
  if(!token || issueTime === 0) {
    return (<Login setToken={setToken} setIssueTime={setIssueTime} setLoggedIn={setLoggedIn} setRole={setAccountRole} host={host} />)
  }
  return (
    <Fragment>
      <Box css={style.content} test-id="mui-root">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="*" element={<EditBuildPage accountRole={accountRole} />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Fragment>
  );




};

export default App;
