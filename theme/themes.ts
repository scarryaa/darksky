import type { Theme } from '../contexts/ThemeContext';

export const lightTheme: Theme = {
    theme: 'light',
    colors: {
        primary: '#fff',
        primary_dark: '#d8d8d8',
        primary_light: '#fff',
        secondary: '#6c757d',
        border: '#e0e0e0',
        text: '#000'
    },
    typography: {
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
        xs: {
            fontSize: 13,
            letterSpacing: 0.25,
            fontWeight: '400',
        },
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};

export const darkTheme: Theme = {
    theme: 'dark',
    colors: {
        primary: '#000',
        primary_dark: '#000',
        primary_light: '#262626',
        secondary: '#6c757d',
        border: '#272727',
        text: '#fff'
    },
    typography: {
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
        xs: {
            fontSize: 13,
            letterSpacing: 0.25,
            fontWeight: '400',
        },
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};