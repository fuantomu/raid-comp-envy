import GA4React from "ga-4-react";
import type { GA4ReactResolveInterface } from "ga-4-react/dist/models/gtagModels";
import { useEffect, useState } from "react";

export default () => {
  let [client, setClient] = useState<GA4ReactResolveInterface>();

  useEffect(() => {
    const ga4React = new GA4React("G-J8JWXZ1179" as string);
    ga4React
      .initialize()
      .then((ga4) => {
        setClient(ga4);
        ga4.pageview(window.location.pathname);
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      });
  }, []);

  return (url: string) => {
    client?.pageview(url);
  };
};
