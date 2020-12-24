/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { FC } from "react";
import useTheme from "../../utils/useTheme";

const GlobalStyles: FC = () => {
  const { colors, typography } = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        :root {
          font-size: 18px;
        }

        html {
          -webkit-text-size-adjust: 100%;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${colors.white};
          font-family: "Futura BT", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          font-size: 100%;
          letter-spacing: 0.01em;
          line-height: ${typography.base.lineHeight};
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
            "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          background-color: ${colors.darkGrey};
        }

        html,
        body {
          height: 100%;
        }

        #app-root {
          display: grid;
          grid-template-rows: auto 1fr auto;
          min-height: 100%;
        }

        strong {
          font-weight: 500;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ol,
        ul {
          margin: 0;
        }

        a {
          color: ${colors.black};
          font-weight: 500;
        }

        img {
          display: block;
        }
      `}
    />
  );
};

export default GlobalStyles;
