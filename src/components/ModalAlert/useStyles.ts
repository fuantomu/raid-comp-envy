import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, shadows, spacing } = theme;

  return {
    modal: css`
      position: absolute;
      width: min(600px, 90vw);
      background-color: ${palette.background.paper};
      border: 2px solid #000;
      box-shadow: ${shadows[5]};
      padding: ${spacing(2, 4, 3)};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${spacing(Spacing.xs)};

      &:focus {
        outline: none;
      }
    `,
    content: css`
      padding-bottom: ${spacing(Spacing.m)};
    `,
    buttons: css`
      display: flex;
      column-gap: ${spacing(Spacing.xs)};

      & > *:first-of-type {
        margin-left: auto;
      }
    `
  };
};
