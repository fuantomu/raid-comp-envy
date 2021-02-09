import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { spacing } = theme;
  const iconSize = spacing(Spacing.xl);

  return {
    roles: css`
      display: grid;
      width: auto;
      grid-template-columns: repeat(5, min-content);
      gap: ${theme.spacing(Spacing.xs)};
      user-select: none;
      place-content: center;
      cursor: pointer;

      @media only screen and (max-width: 650px) {
        & {
          grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
          place-items: center;
        }
      }
    `,
    role: css`
      display: grid;
      grid-template-columns: min-content 3em;
      gap: ${theme.spacing(Spacing.xs)};
      align-items: center;
    `,
    icon: css`
      width: ${iconSize}!important;
      height: ${iconSize}!important;
      border-radius: 20% !important;
      border-width: 0.2ch;
      border-style: solid;
      border-color: black;
    `,
  };
};
