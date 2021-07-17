/** @jsxImportSource @emotion/react */
import "../../utils/i18n";
import { FC, Fragment, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import useStyles from "./useStyles";
import { Box } from "@material-ui/core";

const BuildPage = lazy(() => import("../../pages/BuildPage"));
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const [common] = useTranslation("common");

  return (
    <Fragment>
      <Box css={style.content}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path={`${common("urls.build")}/:buildId([\\w]{8})${common("urls.edit")}`}>
                <EditBuildPage />
              </Route>
              <Route path={`${common("urls.build")}/build`}>
                <EditBuildPage />
              </Route>
              <Route path={`${common("urls.buildGrouped")}/:buildId([\\w]+)/:name?`}>
                <BuildPage grouped />
              </Route>
              <Route path={`${common("urls.build")}/:buildId([\\w]+)/:name?`}>
                <BuildPage />
              </Route>
              <Route path="*">
                <EditBuildPage />
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Fragment>
  );
};

export default App;
