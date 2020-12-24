import { css, keyframes } from "@emotion/react";
import hexToRgba from "../../utils/hexToRgba";
import useTheme from "../../utils/useTheme";

type StyleOptions = { small?: boolean; overlay?: boolean };

export default function useStyles({ small = false, overlay = false }: StyleOptions) {
  const { colors, spacing } = useTheme();

  const spin = keyframes`
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  return {
    base:
      overlay &&
      css`
        align-items: center;
        display: flex;
        left: 0;
        height: 100vh;
        justify-content: center;
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100vw;
      `,
    inner: [
      css`
        align-items: center;
        display: grid;
        grid-auto-flow: column;
        grid-gap: ${small ? spacing.xs : spacing.s};

        &::before {
          animation: ${spin} 1s linear infinite;
          border: 2px solid ${hexToRgba(colors.lightGrey, 0.25)};
          border-top-color: ${colors.white};
          border-radius: 100%;
          content: "";
          display: block;
          height: ${small ? spacing.s : spacing.l};
          width: ${small ? spacing.s : spacing.l};
        }
      `,
      overlay &&
        css`
          background-color: ${colors.grey};
          border-radius: ${spacing.xxs};
          box-shadow: 0px 1px 4px rgba(51, 51, 51, 0.12);
          padding: ${spacing.s};
        `,
    ],
  };
}
