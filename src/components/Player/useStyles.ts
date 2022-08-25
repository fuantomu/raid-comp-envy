import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (className: WarcraftPlayerClass) => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    player: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: ${spacing(Spacing.m)};
      padding: ${spacing(Spacing.xs)};
      margin: ${spacing(Spacing.xxs)} 0;
      background-color: ${palette.background.paper};
      border-radius: ${spacing(Spacing.xxs)};
      align-items: center;
      user-select: none;

      &:hover {
        background-color: ${palette.secondary.dark};
      }
    `,
    icons: css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.2ch;
    `,
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[className]};
    `,
  };
};
