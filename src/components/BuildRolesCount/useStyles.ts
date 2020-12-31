import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { typography: {h5}, spacing } = theme;
  const iconSize = spacing(Spacing.xl);
  const countSize = spacing(Spacing.xl);

  return {
    roles: css`
      display: grid;
      grid-template-columns: repeat(5, calc(${iconSize} + ${h5.fontSize} + ${spacing(Spacing.l)}));
      gap: ${theme.spacing(Spacing.xs)};
      user-select: none;
      cursor: pointer;
    `,
    role: css`
      display: grid;
      grid-template-columns: auto 1fr;
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
