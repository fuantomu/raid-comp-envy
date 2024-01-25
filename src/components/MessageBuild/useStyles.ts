import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    grouped: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr, 1fr));
      gap: ${theme.spacing(Spacing.xxs)};

      @media only screen and (max-width: 650px) {
        & {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr, 1fr));
        }
      }
    `,
    ungrouped: css`
      margin-top: ${theme.spacing(Spacing.m)};
    `
  };
};
