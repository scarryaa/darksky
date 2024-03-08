import { createContext, useState, ReactNode, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';
import { TextStyle } from 'react-native';

export interface Theme {
    theme: 'light' | 'dark' | 'dim',
    colors: {
        primary: string;
        primary_dark: string;
        primary_light: string;
        primary_highlight: string;
        secondary: string;
        border: string;
        borderLight: string;
        borderDark: string;
        text: string;
        textGrey: string;
        textDarkGrey: string;
        red: string;
        green: string;
        blue: string;
    };
    typography: Typography;
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
    };
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export type Typography = Record<TypographyVariant, TextStyle>

export type TypographyVariant =
    'header' |
    'xxl' |
    'xl' |
    'lg' |
    'md-bold' |
    'md' |
    'sm' |
    'sm-bold' |
    'xs';

export const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    toggleTheme: () => { }
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        setTheme(localStorage.getItem('nyasky-theme') == 'dark' ? darkTheme : lightTheme || lightTheme)
        localStorage.getItem
    }, [])

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
        localStorage.setItem('nyasky-theme', theme === lightTheme ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
