/** @jsxImportSource @emotion/react */
import { Box } from "@material-ui/core";
import { FC, Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "../../utils/i18n";
import useStyles from "./useStyles";

const BuildPage = lazy(() => import("../../pages/BuildPage"));
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  return (
    <Fragment>
      <Box css={style.content}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<EditBuildPage />} />
              <Route path="/build" element={<EditBuildPage />} />

              <Route path="/build/:buildId" element={<BuildPage />} />
              <Route path="/build/:buildId/edit" element={<EditBuildPage />} />
              <Route path="/build/:buildId/:name" element={<BuildPage />} />

              <Route path="/build/g/:buildId" element={<BuildPage grouped />} />
              <Route path="/build/g/:buildId/:name" element={<BuildPage grouped />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Fragment>
  );
};

export default App;
