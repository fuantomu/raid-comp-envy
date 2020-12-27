import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { spacing } = theme;
  const iconSize = spacing(Spacing.xl);
  const countSize = spacing(Spacing.xl);

  return {
    roles: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(calc(${iconSize} + ${countSize}), 1fr));
      column-gap: ${theme.spacing(Spacing.xs)};
      user-select: none;
      cursor: pointer;
    `,
    role: css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: ${theme.spacing(Spacing.xs)};
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
