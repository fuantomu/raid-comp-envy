import { css } from "@emotion/react";
import { InviteStatus, WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (className: WarcraftPlayerClass) => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    player: (isClickable: boolean, status?: InviteStatus) => {
      return css`
        display: grid;
        grid-template-columns: 22px 22px 1fr 14px auto;
        gap: ${spacing(Spacing.xs)};
        padding: ${spacing(Spacing.xxs)};
        margin: ${spacing(Spacing.xxs)} 0;
        background-color: ${status === "accepted"? palette.success.dark : status === "declined"? palette.error.dark : status === "tentative"? palette.warning.dark : palette.background.default };
        border-radius: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: ${isClickable && "pointer"};

        &:hover {
          background-color: ${status === "accepted"? palette.success.light : status === "declined"? palette.error.light : status === "tentative"? palette.warning.light : palette.secondary.dark };
        }
      `;
    },
    icons: (showRole?: boolean) => css`
      display: grid;
      grid-template-columns: repeat(${showRole ? 2 : 1}, 1fr);
      gap: 0.2ch;
    `,
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      color: ${WarcraftClassColour[className]};
      text-shadow: 1px 2px 1px black;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `,
  };
};
