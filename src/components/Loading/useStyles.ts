import { css, keyframes } from "@emotion/react";
import hexToRgba from "../../utils/hexToRgba";
import useTheme, { Spacing } from "../../utils/useTheme";

type StyleOptions = { small?: boolean; overlay?: boolean };

export default function useStyles({ small = false, overlay = false }: StyleOptions) {
  const { palette, spacing } = useTheme();

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
        gap: ${small ? spacing(Spacing.xs) : spacing(Spacing.s)};

        &::before {
          animation: ${spin} 1s linear infinite;
          border: 5px solid ${hexToRgba(palette.text.secondary, 0.25)};
          border-top-color: ${palette.text.primary};
          border-radius: 100%;
          content: "";
          display: block;
          height: ${small ? spacing(Spacing.s) : spacing(Spacing.m)};
          width: ${small ? spacing(Spacing.s) : spacing(Spacing.m)};
        }
      `,
      overlay &&
        css`
          background-color: ${palette.background.paper};
          border-radius: ${spacing(Spacing.xxs)};
          box-shadow: 0px 1px 4px rgba(51, 51, 51, 0.12);
          padding: ${spacing(Spacing.s)} ${spacing(Spacing.l)};
        `,
    ],
  };
}
