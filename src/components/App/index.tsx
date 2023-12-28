/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, Fragment, lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../../utils/i18n";
import useStyles from "./useStyles";
import Login from "../Login";
import { checkHash } from "../../utils/hash";
const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const Loading = lazy(() => import("../Loading"));
const EditBuildPage = lazy(() => import("../../pages/EditBuildPage"));

const App: FC = () => {
  const style = useStyles();
  const [token, setToken] = useState(localStorage.getItem("token")?? "");

  if(!token || !checkHash(token)) {
    return <Login setToken={setToken} />
  }

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
