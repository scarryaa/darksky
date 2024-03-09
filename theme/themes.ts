import type { Theme, Typography } from '../contexts/ThemeContext';

const typography: Typography = {
    header: {
        fontSize: 22,
        letterSpacing: 0.25,
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 18,
        letterSpacing: 0.25,
        fontWeight: 'bold',
    },
    xxl: {
        fontSize: 18,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
    xl: {
        fontSize: 17,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
    lg: {
        fontSize: 16,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
    'md-bold': {
        fontSize: 15,
        letterSpacing: 0.25,
        fontWeight: 'bold',
    },
    md: {
        fontSize: 15,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
    sm: {
        fontSize: 14,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
    'sm-bold': {
        fontSize: 14,
        letterSpacing: 0.25,
        fontWeight: 'bold',
    },
    xs: {
        fontSize: 13,
        letterSpacing: 0.25,
        fontWeight: '400',
    },
};

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
};

const sharedColors = {
    red: '#c44a5c',
    green: '#5f7a2e',
    blue: '#49b5c1'
}

export const lightTheme: Theme = {
    theme: 'light',
    colors: {
        ...sharedColors,
        primary: '#fff',
        primary_dark: '#d8d8d8',
        primary_light: '#fff',
        primary_highlight: '#bcbcbc',
        secondary: '#6c757d',
        border: '#e0e0e0',
        borderLight: '#efefef',
        borderDark: '#cecece',
        text: '#000',
        textGrey: '#606060',
        textDarkGrey: '#2d2d2d',
    },
    spacing: spacing,
    typography: typography,
};

export const dimTheme: Theme = {
    theme: 'dim',
    colors: {
        ...sharedColors,
        primary: '#181f26',
        primary_dark: '#0e1216',
        primary_light: '#28343F',
        primary_highlight: '#344351',
        secondary: '#6c757d',
        border: '#273544',
        borderLight: '#324356',
        borderDark: '#1c2530',
        text: '#fff',
        textGrey: '#afafaf',
        textDarkGrey: '#7a7a7a',
    },
    spacing: spacing,
    typography: typography,
};

export const darkTheme: Theme = {
    theme: 'dark',
    colors: {
        ...sharedColors,
        primary: '#000',
        primary_dark: '#000',
        primary_light: '#262626',
        primary_highlight: '#494949',
        secondary: '#6c757d',
        border: '#272727',
        borderLight: '#4c4646',
        borderDark: '#111111',
        text: '#fff',
        textGrey: '#afafaf',
        textDarkGrey: '#7a7a7a',
    },
    spacing: spacing,
    typography: typography,
};