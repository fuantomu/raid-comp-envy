import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (spread: boolean) => {
  const theme = useTheme();
  return {
    spread: [
      spread &&
        css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: ${theme.spacing(Spacing.s)};
        `,
    ],
  };
};
