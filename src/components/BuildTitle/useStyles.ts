import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { typography, spacing } = theme;

  return {
    input: css`
      padding: ${spacing(Spacing.s)};
      font-size: ${typography.h5.fontSize};
    `,
  }
}