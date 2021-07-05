/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { FC } from "react";
import useTheme, { Spacing } from "../../utils/useTheme";

const GlobalStyles: FC = () => {
  const { palette, typography, spacing } = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        :root {
          font-size: ${typography.fontSize}px;
        }

        html {
          -webkit-text-size-adjust: 100%;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${palette.text.primary};
          font-size: 100%;
          letter-spacing: 0.01em;
          line-height: ${typography.body1.lineHeight};
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
            "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          background-color: ${palette.background.default};
        }

        html,
        body {
          height: 100%;
          padding: 0!important;
        }

        #app-root {
          display: grid;
          /* grid-template-rows: auto 1fr auto; */
          min-height: 100%;
        }

        strong {
          font-weight: 500;
        }

        a {
          color: ${palette.action.active};
          font-weight: 500;
        }

        img {
          display: block;
        }

        div[role="tooltip"] > div {
          font-size: ${spacing(Spacing.s)} !important;
        }

        input,
        textarea {
          background-color: ${palette.text.disabled};
          color: ${palette.text.primary};
          border: solid 1px black;
        }

        ::-webkit-scrollbar {
          width: 7px;
        }
        ::-webkit-scrollbar-track {
          background: ${palette.background.paper};
        }
        ::-webkit-scrollbar-thumb {
          background: ${palette.primary.dark};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${palette.primary.main};
        }
      `}
    />
  );
};

export default GlobalStyles;
