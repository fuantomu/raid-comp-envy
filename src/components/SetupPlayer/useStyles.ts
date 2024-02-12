import { css } from "@emotion/react";
import { WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (class_name: WarcraftPlayerClass) => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    player: (isClickable: boolean) => {
      return css`
        display: grid;
        grid-template-columns: 10px 10px 1fr 1em auto;
        gap: ${spacing(Spacing.xs)};
        margin: 1px;
        background-color: ${palette.background.default};
        border-radius: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: ${isClickable && "pointer"};

        &:hover {
          background-color: ${palette.secondary.dark};
        }
      `;
    },
    icons: css`
      display: grid;
      width: 16px;
      height: 16px;
    `,
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[class_name]};
      text-shadow: 1px 1px black;
      text-overflow: ellipsis;
      white-space: nowrap;
    `
  };
};
