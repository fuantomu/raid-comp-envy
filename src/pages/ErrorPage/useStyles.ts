import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const { spacing } = useTheme();

  return {
    gridBox: css`
      display: grid!important;
      place-items: center;
      height: 100vh;
    `,
    box: css`
      text-align: center;
    `,
    header: css`
      padding-bottom: ${spacing(Spacing.xxl)};
    `,
    button: css`
      margin-left: ${spacing(Spacing.xs)}!important;
      margin-right: ${spacing(Spacing.xs)}!important;
    `,
  };
};
