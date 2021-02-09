import { css } from "@emotion/react";
import hexToRgba from "../../utils/hexToRgba";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, shadows, spacing } = theme;
  const iconSize = spacing(Spacing.l);

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
    buttons: css`
      margin-top: ${spacing(Spacing.xs)};
      display: flex;
      column-gap: ${spacing(Spacing.xs)};

      & > *:first-of-type {
        margin-left: auto;
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
    content: css`
      display: grid;
      place-items: center;

      & > * {
        margin: ${spacing(Spacing.xxs)} 0;
      }
    `,
    nameInput: css`
      padding: ${spacing(Spacing.xs)};
      text-align: center;
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
    `
  };
};
