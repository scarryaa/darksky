import { createContext, useState, ReactNode, useEffect, useMemo, useContext } from 'react';
import { lightTheme, darkTheme, dimTheme } from '../theme/themes';
import { TextStyle } from 'react-native';

export type ThemeType = 'light' | 'dim' | 'dark' | 'system';

export interface Theme {
    theme: ThemeType;
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

type ThemeContextType = {
    theme: Theme;
}

type SetThemeContextType = {
    setTheme: (_theme: ThemeType) => void;
}

export type Typography = Record<TypographyVariant, TextStyle>

export type TypographyVariant =
    'header' |
    'subheader' |
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
});

const SetThemeContext = createContext<SetThemeContextType>({} as SetThemeContextType)

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('nyasky-theme');
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isSystemTheme = storedTheme === 'system';

        if (storedTheme === 'dark' || (isSystemTheme && prefersDarkMode)) {
            return {
                ...darkTheme, theme: isSystemTheme ? 'system' : 'dark'
            }
        } else if (storedTheme === 'dim') {
            return dimTheme;
        } else {
            return {
                ...lightTheme, theme: isSystemTheme ? 'system' : 'light'
            };
        }
    });

    useEffect(() => {
        const listener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? darkTheme : lightTheme);
        };

        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQueryList.addEventListener('change', listener);
        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, []);

    const stateContextValue = useMemo(
        () => ({
            theme,
        }),
        [theme],
    )

    const themeContextValue = useMemo(() => ({
        setTheme: (newTheme: string) => {
            let themeToApply: Theme;

            switch (newTheme) {
                case 'light':
                    themeToApply = lightTheme;
                    break;
                case 'dim':
                    themeToApply = dimTheme;
                    break;
                case 'dark':
                    themeToApply = darkTheme;
                    break;
                case 'system':
                    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    themeToApply = prefersDarkMode ? { ...darkTheme, theme: 'system' } : { ...lightTheme, theme: 'system' };
                    break;
                default:
                    themeToApply = lightTheme;
                    break;
            }
            setTheme(themeToApply);
            localStorage.setItem('nyasky-theme', theme.theme);
        },
    }), []);

    return (
        <ThemeContext.Provider value={stateContextValue}>
            <SetThemeContext.Provider value={themeContextValue}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider >
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useSetTheme = () => {
    return useContext(SetThemeContext);
}