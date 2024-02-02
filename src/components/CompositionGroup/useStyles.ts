import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    spread: [
      css`
        display: grid;
        grid-template-columns: 1fr;
        column-gap: ${theme.spacing(Spacing.s)};
      `
    ]
  };
};
