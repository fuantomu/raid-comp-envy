import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (spread: boolean) => {
  const theme = useTheme();
  return {
    spread: [
      spread &&
        css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
