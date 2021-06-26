import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();

  return {
    gridBox: css`
      margin: ${theme.spacing(Spacing.m)} auto !important;
    `,
    header: css`
      display: grid;
      grid-template-columns: 1fr;
      gap: ${theme.spacing(Spacing.m)};
      word-break: break-word;
    `,
    buttons: css`
      display: grid;
      width: min(550px, 100%);
      grid-template-columns: repeat(4, 1fr);
      gap: ${theme.spacing(Spacing.m)};
    `,
    buildTitle: css`
      width: 100%;
    `
  };
};
