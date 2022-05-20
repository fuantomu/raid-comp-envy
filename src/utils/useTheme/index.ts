import { createTheme, ThemeOptions } from "@mui/material/styles";

export type ThemeName = "dark" | "light";

export enum Spacing {
  xxs = 1,
  xs = 2,
  s = 3,
  m = 4,
  l = 5,
  xl = 6,
  xxl = 7,
}

const mainTheme: ThemeOptions = {
  spacing: (factor?: number) => {
    let size;
    switch (factor) {
      case Spacing.xxs:
        size = 0.3;
        break;
      case Spacing.xs:
        size = 0.5;
        break;
      case Spacing.s:
        size = 1;
        break;
      case Spacing.m:
        size = 1.5;
        break;
      case Spacing.l:
        size = 2;
        break;
      case Spacing.xl:
        size = 2.5;
        break;
      case Spacing.xxl:
        size = 3;
        break;
      default:
        size = 1.5 * (factor ?? 1);
        break;
    }
    return `${size}rem`;
  },
  typography: {
    fontSize: 14,
  },
};

const lightTheme: ThemeOptions = {
  ...mainTheme,
  palette: {
    text: {
      primary: "#000",
      secondary: "#111",
    },
  },
};

const darkTheme: ThemeOptions = {
  ...mainTheme,
  palette: {
    background: {
      default: "#242424",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#fff",
      secondary: "#ddd",
    },
    primary: {
      main: "#ad0a0a",
      light: "#d41313",
      dark: "#910404",
    },
    secondary: {
      main: "#616161",
      light: "#757575",
      dark: "#424242",
    },
  },
};

export default () => {
  return createTheme(process.env.DEFAULT_THEME === "LIGHT" ? lightTheme : darkTheme);
};
