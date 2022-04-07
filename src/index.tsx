import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import Providers from "./components/Providers";

if (process.env.REACT_APP_USE_MOCK === "true" && process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { worker } = require("./mocks/browser");

  worker.start({
    onUnhandledRequest: "bypass",
    quiet: true,
  });
}

const container = document.getElementById("app-root");
const root = createRoot(container!);
root.render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
);
