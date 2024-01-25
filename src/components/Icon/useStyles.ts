import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { spacing } = theme;
  const iconSize = spacing(Spacing.l);

  return {
    icon: css`
      width: ${iconSize}!important;
      height: ${iconSize}!important;
      position: relative;
      overflow: hidden;
    `
  };
};
