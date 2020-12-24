import { useCallback, useState } from "react";

/**
 * React Hook that rethrows an error during a re-redner so it can be caught by an ErrorBoundary.
 */
export default () => {
  const [, setError] = useState();

  return useCallback(
    (error) => {
      setError(() => {
        throw error;
      });
    },
    [setError]
  );
};
