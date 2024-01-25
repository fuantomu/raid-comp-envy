import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    grouped: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: ${theme.spacing(Spacing.s)};

      @media only screen and (max-width: 650px) {
        & {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      }
    `,
    ungrouped: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: ${theme.spacing(Spacing.xs)};
      margin-top: ${theme.spacing(Spacing.m)};

      @media only screen and (max-width: 650px) {
        & {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      }
    `
  };
};
