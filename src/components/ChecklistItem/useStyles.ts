import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (count: number = 0) => {
  const theme = useTheme();
  const {
    spacing,
    typography,
    palette,
    palette: { success, warning, error }
  } = theme;

  return {
    checklist: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: ${theme.spacing(Spacing.s)};
    `,
    container: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: ${spacing(Spacing.xs)};
      padding: 3px;
      border-radius: ${spacing(Spacing.xxs)};
      user-select: none;

      &:hover {
        background-color: ${palette.secondary.dark};
      }
    `,
    name: css`
      font-weight: ${typography.fontWeightMedium}!important;
    `,
    count: css`
      color: ${count ? (count > 1 ? success.main : warning.main) : error.main};
    `
  };
};
