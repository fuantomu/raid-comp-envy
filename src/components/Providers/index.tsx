/** @jsxImportSource @emotion/react */
import { FC, StrictMode, Suspense } from "react";

import GlobalStyles from "../GlobalStyles";

const Providers: FC = ({ children }) => (
  <StrictMode>
    <Suspense fallback={null}>
      <GlobalStyles />
      {children}
    </Suspense>
  </StrictMode>
);

export default Providers;
