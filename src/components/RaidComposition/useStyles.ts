import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    grouped: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: ${theme.spacing(Spacing.m)};
    `,
    ungrouped: css`
      margin-top: ${theme.spacing(Spacing.m)};
    `,
  };
};
