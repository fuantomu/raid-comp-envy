import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import Providers from "./components/Providers";
import { StrictMode } from "react";

const container = document.getElementById("app-root");
const root = createRoot(container!);
root.render(
  <StrictMode>
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
  </StrictMode>
);
