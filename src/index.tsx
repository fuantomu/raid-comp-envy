import ReactDOM from "react-dom";
import App from "./components/App";
import Providers from "./components/Providers";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { GA4React } from "ga-4-react";

const history = createBrowserHistory();

if (process.env.REACT_APP_USE_MOCK === "true" && process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { worker } = require("./mocks/browser");

  worker.start({
    onUnhandledRequest: "bypass",
    quiet: true
  });
}

const ga4React = new GA4React("G-J8JWXZ1179" as string);
ga4React
  .initialize()
  .then((ga4) => {
    ga4.pageview(window.location.pathname);
    history.listen(({ pathname }) => {
      ga4.pageview(pathname);
    });
  })
  .catch((err) => {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
  });

ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>,
  document.getElementById("app-root")
);
