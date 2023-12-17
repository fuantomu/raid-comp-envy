/** @jsxImportSource @emotion/react */
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { FC, PropsWithChildren, Suspense } from "react";
import useTheme from "../../utils/useTheme";
import GlobalStyles from "../GlobalStyles";

const Providers: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Suspense fallback={null}>
    <GlobalStyles />
    <ThemeProvider theme={useTheme()}>{children}</ThemeProvider>
  </Suspense>
);

export default Providers;
