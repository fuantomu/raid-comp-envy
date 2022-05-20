/** @jsxImportSource @emotion/react */
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { FC, PropsWithChildren, StrictMode, Suspense } from "react";
import useTheme from "../../utils/useTheme";
import GlobalStyles from "../GlobalStyles";

const Providers: FC<PropsWithChildren<{}>> = ({ children }) => (
  <StrictMode>
    <Suspense fallback={null}>
      <GlobalStyles />
      <ThemeProvider theme={useTheme()}>{children}</ThemeProvider>
    </Suspense>
  </StrictMode>
);

export default Providers;
