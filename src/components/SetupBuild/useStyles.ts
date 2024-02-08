import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  return {
    grouped: css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: ${theme.spacing(Spacing.xxs)};

      @media only screen and (max-width: 650px) {
        & {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr, 1fr));
        }
      }
    `,
    ungrouped: css`
      margin-top: ${theme.spacing(Spacing.m)};
    `,
    default: css`
      display: grid;
      column-gap: ${theme.spacing(Spacing.xxs)};
    `,
    input: css`
      grid-template-columns: 1fr;
    `,
    mediumInput: css`
      grid-template-columns: 1fr 1fr;
    `,
    largeInput: css`
      grid-template-columns: 1fr 1fr 1fr;
    `,
    extremeInput: css`
      grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    spread: [
      css`
        display: grid;
        grid-template-columns: 1fr;
        column-gap: ${theme.spacing(Spacing.s)};
      `
    ]
  };
};
