import type { Theme } from '../contexts/ThemeContext'
import { TextStyle } from "react-native";

export const lightTheme: Theme = {
    colors: {
        primary: '#fff',
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
    colors: {
        primary: '#000',
        secondary: '#6c757d',
        border: '#fff',
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