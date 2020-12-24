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

const App: FC = () => {
  const style = useStyles();
  const [common] = useTranslation("common");

  return (
    <Fragment>
      <main css={style.content} id="content">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={common("urls.home")}>
                <HomePage />
              </Route>
              <Route path={`${common("urls.build")}/:buildId([\\w]{8})?`}>
                <BuildPage />
              </Route>
              <Route path="*">
                <HomePage />
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </main>
    </Fragment>
  );
};

export default App;
