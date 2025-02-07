import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, useTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

interface ExtendedTheme extends Theme {
    colors: {
        grey: Record<number, string>;
        primary: Record<number, string>;
        secondary: Record<number, string>;
        greenAccent: Record<number, string>;
        redAccent: Record<number, string>;
        blueAccent: Record<number, string>;
        backgroundUrl:string
    };
}

// color design tokens export
export const tokens = (mode: string) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#ffffff",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },

            primary: {
                100: "#fffff", // very light shade of sky blue
                200: "#00bfff", // deep sky blue
                300: "#0099cc", // slightly darker shade of sky blue
                400: "#007399", // a bit darker shade of sky blue
                500: "#005580", // medium shade of sky blue
                600: "#004366", // dark sky blue
                700: "#00334d", // even darker shade of sky blue
                800: "#002233", // very deep shade of sky blue
                900: "#000f19"  // extremely deep shade of sky blue
            },


            secondary: {
                100: "#d6cceb",
                200: "#ad99d6",
                300: "#8566c2",
                400: "#5c33ad",
                500: "#330099",
                600: "#29007a",
                700: "#1f005c",
                800: "#14003d",
                900: "#0a001f",
            },
            greenAccent: {
                100: "#ccffcc",
                200: "#99ff99",
                300: "#66ff66",
                400: "#33ff33",
                500: "#00ff00",
                600: "#00cc00",
                700: "#009900",
                800: "#006600",
                900: "#003300"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#FF0000",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
            backgroundUrl:"/img/gradient_dark.jpg"
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#ffffff",
            },

            primary: {
                100: "#000f19",  // extremely deep shade of sky blue
                200: "#002233", // very deep shade of sky blue
                300: "#00334d", // even darker shade of sky blue
                400: "#004366", // dark sky blue
                500: "#005580", // medium shade of sky blue
                600: "#007399", // a bit darker shade of sky blue
                700: "#0099cc", // slightly darker shade of sky blue
                800: "#00bfff", // deep sky blue
                900: "#ffffff", // very light shade of sky blue
            },
            greenAccent: {
                100: "#003300",
                200: "#006600",
                300: "#009900",
                400: "#00cc00",
                500: "#00ff00",
                600: "#33ff33",
                700: "#66ff66",
                800: "#99ff99",
                900: "#ffffff",
            },
            secondary: {
                100: "#0a001f",
                200: "#14003d",
                300: "#1f005c",
                400: "#29007a",
                500: "#330099",
                600: "#5c33ad",
                700: "#8566c2",
                800: "#ad99d6",
                900: "#ffffff",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#FF0000",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#ffffff",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#ffffff",
            },
            backgroundUrl:"/img/gradient.jpg"
        }),
});



// mui theme settings
export const themeSettings = (mode: PaletteMode): ExtendedTheme => {
    const colors = tokens(mode);
    return {
        ...createTheme({
            palette: {
                mode: mode,
                ...(mode === "dark"
                    ? {
                        // palette values for dark mode
                        primary: {
                            main: colors.primary[500],
                            dark: colors.primary[800],
                            light: colors.primary[100],
                        },
                        secondary: {
                            main: colors.secondary[500],
                            dark: colors.secondary[800],
                            light: colors.secondary[100],
                        },
                        neutral: {
                            dark: colors.grey[900],
                            main: colors.grey[500],
                            light: colors.grey[100],
                        },
                        background: {
                            default: colors.primary[900],
                        },
                        backgroundUrl: {
                            default:  "/img/gradient_dark.jpg",
                        },
                    }
                    : {
                        // palette values for light mode
                        primary: {
                            main: colors.primary[500],
                            dark: colors.primary[900],
                            light: colors.primary[100],
                        },
                        secondary: {
                            main: colors.secondary[500],
                            dark: colors.secondary[900],
                            light: colors.secondary[100],
                        },
                        neutral: {
                            dark: colors.grey[900],
                            main: colors.grey[500],
                            light: colors.grey[100],
                        },
                        background: {
                            default:  colors.primary[900],
                        },
                        backgroundUrl: {
                            default:  "/img/gradient.jpg",
                        },
                    }),
            },
            typography: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 12,
                h1: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 40,
                },
                h2: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 32,
                },
                h3: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 24,
                },
                h4: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 20,
                },
                h5: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 16,
                },
                h6: {
                    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                    fontSize: 14,
                },
            }
        }),
        colors: {
            ...colors,
        },
    };
};
// context for color mode
interface ColorModeContextType {
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const useMode = (): [Theme, ColorModeContextType] => {
    const [mode, setMode] = useState<PaletteMode>("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                {

                    setMode((prev) => (prev === "light" ? "dark" : "light"));
                    localStorage.setItem("colorMode", mode);
                } 
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};

// Define colors dynamically based on the current theme mode
export const getColors = () => {
  const theme = useTheme();
  return tokens(theme.palette.mode);
};
