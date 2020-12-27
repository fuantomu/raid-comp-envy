/** @jsxImportSource @emotion/react */
import "../../utils/i18n";

import React, { FC, Fragment, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import BuildPage from "../../pages/BuildPage";
import ErrorBoundary from "../ErrorBoundary";
import HomePage from "../../pages/HomePage";
import Loading from "../Loading";
import useStyles from "./useStyles";
import { Box } from "@material-ui/core";

const App: FC = () => {
  const style = useStyles();
  const [common] = useTranslation("common");

  return (
    <Fragment>
      <Box css={style.content}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={common("urls.home")}>
                <HomePage />
              </Route>
              <Route path={`${common("urls.buildGrouped")}/:buildId([\\w]+)/:name?`}>
                <BuildPage grouped />
              </Route>
              <Route path={`${common("urls.build")}/:buildId([\\w]+)/:name?`}>
                <BuildPage />
              </Route>
              {/* <Route path={`${common("urls.build")}/:buildId([\\w]{8})/edit`}>
                <EditBuildPage />
              </Route>
              <Route path={`${common("urls.build")}/build`}>
                <EditBuildPage />
              </Route> */}
              {/* <Route path="*" >
                {null}
              </Route> */}
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Fragment>
  );
};

export default App;
