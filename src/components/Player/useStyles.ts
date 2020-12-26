import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (className: WarcraftPlayerClass) => {
  const theme = useTheme();
  const iconSize = theme.spacing(Spacing.l);

  return {
    player: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-gap: ${theme.spacing(Spacing.m)};
      padding: ${theme.spacing(Spacing.xs)};
      margin: ${theme.spacing(Spacing.xxs)} 0;
      background-color: ${theme.palette.background.paper};
      border-radius: ${theme.spacing(Spacing.xxs)};
      align-items: center;
      user-select: none;

      &:hover {
        background-color: ${theme.palette.primary.dark};
      }
    `,
    icons: css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.2ch;
    `,
    icon: css`
      width: ${iconSize}!important;
      height: ${iconSize}!important;
      border-radius: 20% !important;
      border-width: 0.2ch;
      border-style: solid;
      border-color: black;
    `,
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[className]};
    `,
  };
};
