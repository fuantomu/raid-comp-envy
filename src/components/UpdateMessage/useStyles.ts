import { css } from "@emotion/react";
import cataclysm from "../../icons/cataclysm_background.png";
import wotlk from "../../icons/wotlk_background.png";
import useTheme, { Spacing } from "../../utils/useTheme";

export default () => {
  const theme = useTheme();
  const { palette, spacing } = theme;

  return {
    message: (version?: string) => {
      return css`
        display: grid;
        grid-template-columns: 1fr auto;
        padding: ${spacing(Spacing.xxs)};
        align-items: center;
        user-select: none;
        cursor: pointer;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        gap: ${theme.spacing(Spacing.s)};
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          ${version === "Cataclysm"
            ? `url(${cataclysm})`
            : version === "Wotlk"
            ? `url(${wotlk})`
            : palette.background.default};
        background-position: 0% 22%;
        &:hover {
          background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(166, 166, 166, 0.1)),
            ${version === "Cataclysm"
              ? `url(${cataclysm})`
              : version === "Wotlk"
              ? `url(${wotlk})`
              : palette.background.default};
          background-position: 0% 22%;
        }
      `;
    },
    name: css`
      font-weight: ${theme.typography.fontWeightMedium}!important;
      text-shadow: 1px 1px black;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    `,
    change: css`
      display: grid;
      grid-template-columns: 1fr auto;
      background-color: ${palette.secondary.dark};
      padding: 4px;
      margin-left: 4px;
      gap: ${theme.spacing(Spacing.xxs)};
      font-size: 12px;
      font-weight: ${theme.typography.fontWeightMedium}!important;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-shadow: 1px 1px black;
    `
  };
};
