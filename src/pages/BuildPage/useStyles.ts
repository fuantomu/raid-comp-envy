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
      grid-template-columns: 1fr auto;
      gap: ${theme.spacing(Spacing.m)};
      word-break: break-all;
    `,
    buttons: css`
      display: grid;
      width: min(350px, 100%);
      grid-template-columns: repeat(2, 1fr);
      gap: ${theme.spacing(Spacing.m)};
    `,
  };
};
