import React, { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  setMode: () => {},
});

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = sessionStorage.getItem('colorMode') as PaletteMode;
    return savedMode || 'light';
  });

  useEffect(() => {
    sessionStorage.setItem('colorMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setMode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2', // Primary color
          },
          secondary: {
            main: '#dc004e', // Secondary color
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
          },
        },
        typography: {
          h6: {
            fontWeight: 700,
          },
          button: {
            textTransform: 'none',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8, // Rounded corners for buttons
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize styles across browsers */}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;