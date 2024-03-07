import type { Theme, Typography } from '../contexts/ThemeContext';

const typography: Typography = {
    header: {
        fontSize: 20,
        letterSpacing: 0.25,
        fontWeight: 'bold'
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
    small: 8,
    medium: 16,
    large: 24,
};

export const lightTheme: Theme = {
    theme: 'light',
    colors: {
        primary: '#fff',
        primary_dark: '#d8d8d8',
        primary_light: '#fff',
        secondary: '#6c757d',
        border: '#e0e0e0',
        text: '#000',
        textGrey: '#606060',
        textDarkGrey: '#2d2d2d',
    },
    spacing: spacing,
    typography: typography,
};

export const darkTheme: Theme = {
    theme: 'dark',
    colors: {
        primary: '#000',
        primary_dark: '#000',
        primary_light: '#262626',
        secondary: '#6c757d',
        border: '#272727',
        text: '#fff',
        textGrey: '#afafaf',
        textDarkGrey: '#7a7a7a',
    },
    spacing: spacing,
    typography: typography,
};