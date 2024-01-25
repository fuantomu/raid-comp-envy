import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    icon: css`
      position: absolute;
      top: ${theme.spacing(Spacing.s)};
      right: ${theme.spacing(Spacing.s)};
    `,
    container: css`
      position: relative;
    `
  };
};
