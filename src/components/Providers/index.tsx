/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { ThemeProvider } from "@material-ui/core";
import { FC, StrictMode, Suspense } from "react";

import GlobalStyles from "../GlobalStyles";

const Providers: FC = ({ children }) => (
  <StrictMode>
    <Suspense fallback={null}>
      <GlobalStyles />
      <ThemeProvider theme={useTheme()}>
        {children}
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);

export default Providers;
