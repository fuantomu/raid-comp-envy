import { css } from "@emotion/react";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();

  return {
    gridBox: css`
      margin: ${theme.spacing(Spacing.m)} auto !important;
    `,
    header: css`
      display: grid;
      grid-template-rows: auto auto;
      gap: ${theme.spacing(Spacing.m)};
      word-break: break-word;
    `,
    buttons: css`
      display: flex;
      width: min(550px, 100%);
      justify-content: center;
      gap: ${theme.spacing(Spacing.m)};

      & > * {
        width: 10em;
      }
    `,
    rolesCount: css`
      place-self: center;
    `,
    headerText: css`
      text-align: center;
    `,
  };
};
