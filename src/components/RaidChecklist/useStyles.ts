import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (count: number = 0) => {
  const theme = useTheme();
  const {
    spacing,
    typography,
    palette,
    palette: { success, warning, error },
  } = theme;
  const iconSize = spacing(Spacing.l);

  return {
    checklist: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: ${theme.spacing(Spacing.m)};
    `,
    container: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      grid-gap: ${spacing(Spacing.xs)};
      padding: ${spacing(Spacing.xs)};
      border-radius: ${spacing(Spacing.xxs)};
      user-select: none;

      &:hover {
        background-color: ${palette.primary.dark};
      }
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
      font-weight: ${typography.fontWeightMedium}!important;
    `,
    count: css`
      color: ${count ? (count > 1 ? success.main : warning.main) : error.main};
    `,
  };
};
