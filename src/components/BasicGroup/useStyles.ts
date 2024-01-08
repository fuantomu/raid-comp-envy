import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    input: css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: ${theme.spacing(Spacing.s)};
    `,
  };
};
