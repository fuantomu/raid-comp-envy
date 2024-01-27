import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    message: () => {
      return css`
        display: grid;
        grid-template-columns: 1fr auto;
        padding: ${spacing(Spacing.xxs)};
        background-color: ${palette.background.default};
        align-items: center;
        user-select: none;
        cursor: pointer;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        gap: ${theme.spacing(Spacing.s)};

        &:hover {
          background-color: ${palette.primary.dark};
        }
      `;
    },
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      text-shadow: 1px 1px black;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    `,
    change: css`
      display: grid;
      grid-template-columns: 1fr auto;
      background-color: ${palette.secondary.dark};
      padding: 4px;
      margin-left: 4px;
      gap: ${theme.spacing(Spacing.xxs)};
      font-size: 12px;
      font-weight: ${theme.typography.fontWeightMedium}!important;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-shadow: 1px 1px black;
    `
  };
};
