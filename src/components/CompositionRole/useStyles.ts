import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (spread: boolean) => {
  const theme = useTheme();
  const { spacing } = theme;
  const iconSize = spacing(Spacing.xl);
  return {
    header: css`
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: ${theme.spacing(Spacing.xs)};
    `,
    icon: css`
      width: ${iconSize}!important;
      height: ${iconSize}!important;
      border-radius: 20% !important;
      border-width: 0.2ch;
      border-style: solid;
      border-color: black;
    `,
    spread: [
      spread &&
        css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, auto));
          column-gap: ${theme.spacing(Spacing.m)};
        `,
    ],
  };
};
