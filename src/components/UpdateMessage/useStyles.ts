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
        gap: ${spacing(Spacing.xxs)};
        padding: ${spacing(Spacing.xxs)};
        margin: 2px;
        background-color: ${palette.background.default};
        border-radius: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: pointer;

        &:hover {
          background-color: ${palette.secondary.dark};
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
      background-color: ${palette.primary.dark};
      padding: 1px;
      gap: ${theme.spacing(Spacing.xxs)};
    `
  };
};
