const maxPageWidth = 1200;
const midPageWidth = "40rem";
const minPageWidth = 360;
const maxFieldWidth = "26.5rem";

type Typography = {
  lineHeight: number;
};

type Theme = {
  colors: Record<string, string>;
  breaks: Record<string, string>;
  layout: Record<string, number | string>;
  spacing: Record<string, string>;
  transitionDuration: string;
  typography: {
    base: Typography;
    sizes: Record<number, Typography>;
  };
};

const createTheme = <T extends Theme>(theme: T): (() => T) => () => theme;

export default createTheme({
  colors: {
    grey: "#1d1d1d",
    black: "#000",
    lightGrey: "#a8a8a8",
    darkGrey: "#0f0f0f",
    white: "#fff",
    red: "#f00",
  },
  breaks: {
    maxPageWidth: `screen and (min-width: ${maxPageWidth}px)`,
    midPageWidth: `screen and (min-width: ${midPageWidth})`,
    minPageWidth: `screen and (min-width: ${minPageWidth}px)`,
  },
  layout: {
    maxPageWidth,
    midPageWidth,
    minPageWidth,
    maxFieldWidth,
  },
  pageGridGap: ["18px", "60px"],
  spacing: {
    xxs: "0.3rem",
    xs: "0.5rem",
    s: "1rem",
    m: "1.5rem",
    l: "2rem",
    xl: "2.5rem",
    xxl: "3rem",
  },
  transitionDuration: "0.2s",
  typography: {
    base: {
      lineHeight: 1.5,
    },
    sizes: {
      1: {
        fontSize: "2.2rem",
        lineHeight: 1.2,
      },
      2: {
        fontSize: "1.7rem",
        lineHeight: 1.2,
      },
      3: {
        fontSize: "1.4rem",
        lineHeight: 1.3333,
      },
      4: {
        fontSize: "1.2rem",
        lineHeight: 1.4,
      },
      5: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      6: {
        fontSize: "0.9rem",
        lineHeight: 1.5,
      },
      7: {
        fontSize: "0.77rem",
        lineHeight: 1.5,
      },
    },
  },
});
