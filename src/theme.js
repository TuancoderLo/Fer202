import { createTheme } from "@mui/material/styles";

// Đơn giản hóa - chỉ giữ một cách định nghĩa theme
const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "dark" ? "#4caf50" : "#2e7d32",
        light: mode === "dark" ? "#81c784" : "#4caf50",
        dark: mode === "dark" ? "#388e3c" : "#1b5e20",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#f48fb1" : "#e91e63",
        light: mode === "dark" ? "#f8bbd0" : "#f48fb1",
        dark: mode === "dark" ? "#c2185b" : "#c2185b",
        contrastText: mode === "dark" ? "#000000" : "#ffffff",
      },
      background: {
        default: mode === "dark" ? "#111827" : "#f6f9fc",
        paper: mode === "dark" ? "#1f2937" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f5f5f5" : "#333333",
        secondary: mode === "dark" ? "#b0b0b0" : "#637381",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: 500,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.75rem",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.5rem",
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.25rem",
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            borderRadius: 12,
            ...(mode === "dark" && {
              backgroundImage: "none",
            }),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            borderRadius: 12,
            boxShadow:
              mode === "dark"
                ? "0px 4px 12px rgba(0, 0, 0, 0.2)"
                : "0px 4px 12px rgba(0, 0, 0, 0.05)",
            ...(mode === "dark" && {
              backgroundImage: "none",
            }),
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontWeight: 500,
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
          },
          switchBase: {
            padding: 1,
            "&.Mui-checked": {
              transform: "translateX(16px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: mode === "dark" ? "#4caf50" : "#2e7d32",
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            opacity: 1,
            backgroundColor: mode === "dark" ? "#8796A5" : "#aab4be",
          },
        },
      },
    },
  });
};

export default getTheme;
