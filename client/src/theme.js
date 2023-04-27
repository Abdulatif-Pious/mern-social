

// color design tokens
const colorTokens = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#4d4d4d",
    700: "#333333",
    800: "#1a1a1a",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#e6fbff",
    100: "#ccf7fe",
    200: "#99eefd",
    300: "#66e6fc",
    400: "#33ddfb",
    500: "#00d5fa",
    600: "#00a0bc",
    700: "#006b7d",
    800: "#00353f",
    900: "#001519",
  },
};

// mui color settings 
export const themeSettings = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark" ? {
      // PALETTE VALUES FOR DARK MODE
      primary: {
        dark: colorTokens.primary[200],
        main: colorTokens.primary[500],
        light: colorTokens.primary[600],
      },
      neutral: {
        dark: colorTokens.grey[100],
        main: colorTokens.grey[200],
        mediumMain: colorTokens.grey[300],
        medium: colorTokens.grey[400],
        light: colorTokens.grey[700],
      },
      background: {
        default: colorTokens.grey[900],
        alt: colorTokens.grey[800],
      },
    } : {
      // PALETTE VALUES FOR LIGHT MODE
      primary: {
        dark: colorTokens.primary[800],
        main: colorTokens.primary[500],
        light: colorTokens.primary[200],
      },
      neutral: {
        dark: colorTokens.grey[700],
        main: colorTokens.grey[500],
        mediumMain: colorTokens.grey[400],
        medium: colorTokens.grey[300],
        light: colorTokens.grey[50],
      },
      background: {
        default: colorTokens.grey[10],
        alt: colorTokens.grey[0],
      },
    })
  }
})
