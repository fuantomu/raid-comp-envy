import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { spacing } = theme;

  return {
    nameInputWrapper: css`
      width: 100%;
    `,
    nameInput: css`
      width: 100%;
      padding: ${spacing(Spacing.xs)};
    `
  };
};
