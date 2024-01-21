import { css } from "@emotion/react";

export default (windowSize: number) => {

  return {
    base: css`
        margin-top: ${windowSize<= 1080? "-12%": "-2%"};
        margin-left: ${windowSize<= 1080? "-20.7%": "-18.7%"};
    `,
    image: css`
        transform: ${windowSize<= 1080? "scale(0.60)": "scale(0.8)"};
    `
  };
}
