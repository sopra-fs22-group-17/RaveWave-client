import { ButtonStylesParams, Global, MantineColor, MantineProvider, MantineTheme, MantineThemeColors, MantineThemeOverride } from "@mantine/core";
import { CSSProperties } from "react";

import { FCC } from "./@def";

export interface IRaveWaveTheme extends MantineTheme {
    accentFontFamily: CSSProperties["fontFamily"];
    accentColor: keyof MantineThemeColors;
}

export const settings = {
    // fontFamily: "IBM Plex Sans",
};

export interface IRaveWaveThemeOverride extends MantineThemeOverride {
    accentColor: MantineColor;
}

export const theme: IRaveWaveThemeOverride = {
    colorScheme: "dark", // light | dark;
    // fontFamily: settings.fontFamily,
    headings: {
        // fontFamily: settings.fontFamily,
        sizes: {
            h1: { fontSize: "3em", lineHeight: 1.3 },
        },
    },
    colors: {
        dark: ["#D2C8DF", "#C3B6D4", "#B4A4CA", "#A491BF", "#957FB4", "#866DA9", "#775A9F", "#684894", "#5E4185", "#533A76"],
        background: ["#533A76"],
        brightPink: ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
    },
    primaryColor: "green",
    accentColor: "orange",
};

const overrides = {
    Button: (theme: MantineTheme, params: ButtonStylesParams) => ({
        root: {
            //[`&:not(.${getRef("loading")}):disabled`]: {
            "&:not(.mantine-Button-loading):disabled": {
                cursor: "default",
                backgroundColor: "gray",
            },
        },
    }),
    ActionIcon: (theme: MantineTheme, params: ButtonStylesParams) => ({
        root: {
            "&:disabled": {
                cursor: "default",
            },
        },
    }),
};

export const Theme: FCC<{}> = ({ children }) => {
    return (
        <MantineProvider
            theme={theme}
            emotionOptions={{ key: "ravewave" }}
            styles={overrides as any}
            defaultProps={
                {
                    // Divider: {
                    //     label: "RaveWave Divider",
                    //     labelPosition: "centererd",
                    //     variant: "dotted",
                    // },
                }
            }
        >
            <Global
                styles={(theme) => {
                    return {
                        "*, *::before, *::after": {
                            boxSizing: "border-box",
                        },

                        body: {
                            ...theme.fn.fontStyles(),
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.background : theme.white,
                            color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
                            lineHeight: theme.lineHeight,
                        },
                    };
                }}
            />
            {children}
        </MantineProvider>
    );
};
