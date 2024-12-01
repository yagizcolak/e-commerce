import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeColors } from "../styles/themeColors";

/** Defines the shape of ColorModeContext */
interface ColorModeContextType {
  /** Current theme mode */
  mode: PaletteMode;
  /** Function to toggle theme mode */
  toggleColorMode: () => void;
  /** Function to set theme mode */
  setMode: (mode: PaletteMode) => void;
}

/** Creates ColorModeContext with default values */
export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  toggleColorMode: () => {
    throw new Error("toggleColorMode function must be overridden");
  },
  setMode: () => {
    throw new Error("setMode function must be overridden");
  },
});

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = sessionStorage.getItem("colorMode") as PaletteMode;
    return savedMode || "light";
  });

  useEffect(() => {
    sessionStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
      setMode,
    }),
    [mode]
  );

  /** Create MUI theme based on current mode */
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: themeColors.primaryMain,
            light: themeColors.primaryLight,
            dark: themeColors.primaryDark,
          },
          secondary: {
            main: themeColors.secondaryMain,
            light: themeColors.secondaryLight,
            dark: themeColors.secondaryDark,
          },
          error: {
            main: themeColors.errorMain,
            light: themeColors.errorLight,
            dark: themeColors.errorDark,
          },
          warning: {
            main: themeColors.warningMain,
            light: themeColors.warningLight,
            dark: themeColors.warningDark,
          },
          info: {
            main: themeColors.infoMain,
            light: themeColors.infoLight,
            dark: themeColors.infoDark,
          },
          success: {
            main: themeColors.successMain,
            light: themeColors.successLight,
            dark: themeColors.successDark,
          },
          background: {
            default:
              mode === "light"
                ? themeColors.backgroundDefaultLight
                : themeColors.backgroundDefaultDark,
            paper:
              mode === "light"
                ? themeColors.backgroundPaperLight
                : themeColors.backgroundPaperDark,
          },
          text: {
            primary:
              mode === "light"
                ? themeColors.textPrimaryLight
                : themeColors.textPrimaryDark,
            secondary: themeColors.textSecondary,
          },
          common: {
            black: themeColors.black,
            white: themeColors.white,
          },
        },
        typography: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          h6: {
            fontWeight: 700,
          },
          button: {
            textTransform: "none",
          },
        },
      }),
    [mode]
  );

  /** Inject CSS variables based on theme */
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--primary-color", theme.palette.primary.main);
    root.style.setProperty(
      "--primary-color-light",
      theme.palette.primary.light
    );
    root.style.setProperty("--primary-color-dark", theme.palette.primary.dark);

    root.style.setProperty("--secondary-color", theme.palette.secondary.main);
    root.style.setProperty(
      "--secondary-color-light",
      theme.palette.secondary.light
    );
    root.style.setProperty(
      "--secondary-color-dark",
      theme.palette.secondary.dark
    );

    root.style.setProperty("--error-color", theme.palette.error.main);
    root.style.setProperty("--error-color-light", theme.palette.error.light);
    root.style.setProperty("--error-color-dark", theme.palette.error.dark);

    root.style.setProperty("--warning-color", theme.palette.warning.main);
    root.style.setProperty("--info-color", theme.palette.info.main);
    root.style.setProperty("--success-color", theme.palette.success.main);

    root.style.setProperty(
      "--background-color",
      theme.palette.background.paper
    );
    root.style.setProperty(
      "--background-default",
      theme.palette.background.default
    );

    root.style.setProperty("--text-primary-color", theme.palette.text.primary);
    root.style.setProperty(
      "--text-secondary-color",
      theme.palette.text.secondary
    );

    root.style.setProperty("--white-color", theme.palette.common.white);
    root.style.setProperty("--black-color", theme.palette.common.black);
  }, [theme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
