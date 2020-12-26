import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme from "../../utils/useTheme";

export default (className: WarcraftPlayerClass, count: number) => {
  const { typography } = useTheme();

  return {
    name: css`
      font-weight: ${typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[className]};
    `,
  };
};
