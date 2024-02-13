import { css } from "@emotion/react";

export default () => {
  return {
    grouped: css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 3px;
    `,
    input: css`
      grid-template-columns: 1fr;
    `
  };
};
