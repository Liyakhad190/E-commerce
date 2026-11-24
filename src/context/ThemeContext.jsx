import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getMuiTheme } from '../theme/muiTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = useMemo(() => getMuiTheme('light'), []);

  const contextValue = useMemo(
    () => ({
      mode: 'light',
      toggleTheme: () => {},
      isDark: false,
    }),
    []
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
