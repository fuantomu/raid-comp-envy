import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    grouped: css`
      display: grid;
      grid-template-columns: 1fr;
      gap: ${theme.spacing(Spacing.xxs)};
    `,
    ungrouped: css`
      margin-top: ${theme.spacing(Spacing.m)};
    `
  };
};
