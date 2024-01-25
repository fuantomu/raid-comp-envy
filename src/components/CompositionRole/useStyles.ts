import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (spread: boolean) => {
  const theme = useTheme();
  return {
    header: css`
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: ${theme.spacing(Spacing.xs)};
    `,
    spread: [
      spread &&
        css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, auto));
          column-gap: ${theme.spacing(Spacing.m)};
        `
    ]
  };
};
