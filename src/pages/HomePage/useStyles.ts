import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();

  return {
    gridBox: css`
      margin: ${theme.spacing(Spacing.xs)} auto !important;
    `,
    header: css`
      display: grid;
      grid-template-columns: 1fr;
      gap: ${theme.spacing(Spacing.s)};
      word-break: break-word;
    `,
    buttons: css`
      display: flex;
      width: min(550px, 100%);
      justify-content: center;
      gap: ${theme.spacing(Spacing.s)};
      flex-wrap: wrap;

      & > * {
        width: 10em;
      }
    `,
    buildTitle: css`
      width: 100%;
    `
  };
};
