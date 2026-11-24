import { createTheme } from '@mui/material/styles';

/**
 * Strict 60-30-10 Color System
 * 60% Main Color: Ricotta Cream (#F0E8D8)
 * 30% Secondary Color: Prussian Blue (#1B3350)
 * 10% Accent Color: Lobster Red (#F03A2A)
 */

export const getMuiTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1B3350', // Prussian Blue
        light: '#2A486C',
        dark: '#122438',
        contrastText: '#F0E8D8',
      },
      secondary: {
        main: '#F0E8D8', // Ricotta Cream
        light: '#F8F3EA',
        dark: '#DECDB5',
        contrastText: '#1B3350',
      },
      accent: {
        main: '#F03A2A', // Lobster Red
        light: '#F66254',
        dark: '#D82F20',
        contrastText: '#FFFFFF',
      },
      background: {
        default: isDark ? '#112033' : '#F0E8D8', // 60% Canvas
        paper: isDark ? '#1B3350' : '#F8F3EA', // Elevated surfaces
      },
      text: {
        primary: isDark ? '#F0E8D8' : '#1B3350',
        secondary: isDark ? '#D8C9B4' : '#415770',
      },
      divider: isDark ? 'rgba(240, 232, 216, 0.14)' : 'rgba(27, 51, 80, 0.12)',
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      h1: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 800,
        letterSpacing: '-0.025em',
        lineHeight: 1.15,
      },
      h2: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        letterSpacing: '-0.015em',
        lineHeight: 1.25,
      },
      h4: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h5: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.35,
      },
      h6: {
        fontWeight: 700,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle2: {
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 700,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      caption: {
        letterSpacing: '0.01em',
        lineHeight: 1.4,
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '9px 20px',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: 'none',
            '&:active': {
              transform: 'scale(0.98)',
            },
            '&:hover': {
              boxShadow: '0 4px 14px rgba(27, 51, 80, 0.12)',
            },
          },
          containedPrimary: {
            backgroundColor: '#1B3350',
            color: '#F0E8D8',
            '&:hover': {
              backgroundColor: '#26456B',
              boxShadow: '0 6px 18px rgba(27, 51, 80, 0.2)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 700,
            transition: 'all 0.2s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            backgroundImage: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            backgroundImage: 'none',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          },
        },
      },
    },
  });
};
