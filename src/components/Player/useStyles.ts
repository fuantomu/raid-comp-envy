import { css } from "@emotion/react";
import { InviteStatus, WarcraftClassColour, WarcraftPlayerClass } from "../../consts";
import useTheme, { Spacing } from "../../utils/useTheme";

export default (class_name: WarcraftPlayerClass) => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    player: (isClickable: boolean, status?: InviteStatus, basic: boolean = false) => {
      return css`
        display: grid;
        grid-template-columns: ${basic ? "10px 10px 1fr 1em auto" : "18px 18px 1fr 14px auto"};
        gap: ${spacing(Spacing.xs)};
        margin: 1px;
        background-color: ${status === "accepted"
          ? "#2c4a2c"
          : status === "declined"
          ? "#4a2121"
          : status === "tentative"
          ? "#69670e"
          : status === "benched"
          ? palette.mode
          : palette.background.default};
        border-radius: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: ${isClickable && "pointer"};

        &:hover {
          background-color: ${status === "accepted"
            ? palette.success.light
            : status === "declined"
            ? palette.error.light
            : status === "tentative"
            ? palette.warning.dark
            : palette.secondary.dark};
        }
      `;
    },
    icons: (basic = false) => {
      return css`
        display: grid;
        width: ${basic ? "16px" : "24px"};
        height: ${basic ? "16px" : "24px"};
      `;
    },
    name: (status = InviteStatus.Unknown) => {
      return css`
        font-weight: ${theme.typography.fontWeightMedium}!important;
        color: ${status === InviteStatus.Benched
          ? palette.grey.A700
          : WarcraftClassColour[class_name]};
        text-shadow: 1px 1px black;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: ellipsis;
      `;
    }
  };
};
