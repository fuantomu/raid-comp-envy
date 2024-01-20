import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (spread: boolean) => {
  const theme = useTheme();
  return {
    spread: (windowSize: number) => [
      spread &&
        css`
          display: grid;
          grid-template-columns: ${windowSize > 1200? "1fr 1fr 1fr" : "1fr 1fr"};
          column-gap: ${theme.spacing(Spacing.xxs)};
        `,
    ],
    scroll: css`
      overflow-y: scroll;
    `,
    gridBox: css`
      margin: ${theme.spacing(Spacing.xs)} auto !important;
    `,
  };
};
