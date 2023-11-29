/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../utils/i18n";
import useTrack from "../../utils/useTrack";
import useStyles from "./useStyles";
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const location = useLocation();
  const track = useTrack();

  useEffect(() => {
    track(location.pathname);
  }, [track, location]);

  return (
    <Fragment>
      <Box css={style.content} test-id="mui-root">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="*" element={<EditBuildPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Fragment>
  );
};

export default App;
