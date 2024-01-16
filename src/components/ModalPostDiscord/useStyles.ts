import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, shadows, spacing } = theme;

  return {
    modal: css`
      position: absolute;
      width: min(800px, 90vw);
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
    textarea: css`
      width: 100%;
      height: 30vh;
      resize: none;
      padding: ${spacing(Spacing.s)};
    `,
    buttons: css`
      margin-top: ${spacing(Spacing.xs)};
      display: flex;
      column-gap: ${spacing(Spacing.xs)};

      & > *:first-of-type {
        margin-left: auto;
      }
    `,
    nameInput: css`
      width: 100%;
      padding: ${spacing(Spacing.xs)};

      input {
        text-align: center;
      }
    `,
    content: css`
      display: grid;
      place-items: center;

      & > * {
        margin: ${spacing(Spacing.xxs)} 0;
      }
    `,
    nameInputWrapper: css`
      width: 100%;
    `,
  };
};
