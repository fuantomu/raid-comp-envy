import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (className: WarcraftPlayerClass) => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    player: (isClickable: boolean) => {
      return css`
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: ${spacing(Spacing.m)};
        padding: ${spacing(Spacing.xs)};
        margin: ${spacing(Spacing.xxs)} 0;
        background-color: ${palette.background.paper};
        border-radius: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: ${isClickable && "pointer"};

        &:hover {
          background-color: ${palette.secondary.dark};
        }
      `;
    },
    icons: (showRole?: boolean) => css`
      display: grid;
      grid-template-columns: repeat(${showRole ? 2 : 1}, 1fr);
      gap: 0.2ch;
    `,
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[className]};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `,
  };
};
