import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    default: css`
      display: grid;
      column-gap: ${theme.spacing(Spacing.xxs)};
    `,
    input: css`
      grid-template-columns: 1fr;
    `,
    mediumInput: css`
      grid-template-columns: 1fr 1fr;
    `,
    largeInput: css`
      grid-template-columns: 1fr 1fr 1fr;
    `,
    extremeInput: css`
      grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    scroll: css`
      overflow-y: scroll;
    `
  };
};
