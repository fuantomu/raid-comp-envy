import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme from "../../utils/useTheme";

export default (class_name: WarcraftPlayerClass) => {
  const { typography } = useTheme();

  return {
    name: css`
      font-weight: ${typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[class_name]};
    `
  };
};
