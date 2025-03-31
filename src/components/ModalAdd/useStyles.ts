import { css } from "@emotion/react";
import hexToRgba from "../../utils/hexToRgba";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, shadows, spacing } = theme;

  return {
    modal: css`
      width: min(800px, 90vw);
      height: 620px;
      background-color: ${palette.background.paper};
      border: 2px solid #000;
      box-shadow: ${shadows[5]};
      padding: ${spacing(2, 4, 3)};
      border-radius: ${spacing(Spacing.xs)};

      &:focus {
        outline: none;
      }
    `,
    buttons: css`
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      column-gap: ${spacing(Spacing.xs)};

      & > *:first-of-type {
        margin-left: auto;
      }
    `,
    content: css`
      display: grid;
      place-items: center;


    `,
    nameInputWrapper: css`
      width: 100%;
    `,
    nameInput: css`
      width: 100%;
      padding: ${spacing(Spacing.xs)};

      input {
        text-align: center;
      }
    `,
    groupSelectElement: css`
      color: ${palette.text.primary};
    `,
    buttonGroups: css`
      flex-wrap: wrap;
      place-content: center;

      & > button.Mui-selected {
        background-color: ${hexToRgba(palette.primary.dark, 0.6)};
      }

      & button.MuiButtonBase-root.MuiToggleButton-root {
        border: 1px solid rgba(0, 0, 0, 0.12);
        padding: 7px;
      }
    `,
    specSwapButton: css`
      flex-wrap: wrap;
      place-content: center;
      background-color: ${palette.text.disabled};

      & > button.Mui-selected {
        background-color: ${hexToRgba(palette.primary.dark, 0.6)};
      }

      & button.MuiButtonBase-root.MuiToggleButton-root {
        border: 1px solid rgba(0, 0, 0, 0.12);
        padding: 7px;
      }
    `
  };
};
