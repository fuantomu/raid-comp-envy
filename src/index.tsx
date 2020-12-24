import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Providers from "./components/Providers";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (process.env.REACT_APP_USE_MOCK === "true" && process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { worker } = require("./mocks/browser");

  worker.start();
}

ReactDOM.render(
  <Providers>
    <Router history={history}>
      <App />
    </Router>
  </Providers>,
  document.getElementById("app-root")
);
