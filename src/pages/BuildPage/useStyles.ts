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
      grid-template-columns: auto auto;
      column-gap: ${theme.spacing(Spacing.m)};
      word-break: break-all;
    `,
  };
};
