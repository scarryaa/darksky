import { createContext, useState, type ReactNode, useEffect, useMemo, useContext } from 'react';
import { lightTheme, darkTheme, dimTheme } from '../theme/themes';
import { type TextStyle } from 'react-native';

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
    white: string;
    black: string;
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
}

interface SetThemeContextType {
  setTheme: (_theme: ThemeType) => void;
}

export type Typography = Record<TypographyVariant, TextStyle>

export type TypographyVariant =
    'header' |
    'subheader' |
    'xxl' |
    'xl' |
    'lg' |
    'bold' |
    'md-bold' |
    'md' |
    'sm' |
    'sm-bold' |
    'xs' |
    'xxs';

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme
});

const SetThemeContext = createContext<SetThemeContextType>({
  setTheme: function (_theme: ThemeType): void {
    throw new Error('Function not implemented.');
  }
})

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('darksky-theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
    const listener = (e: MediaQueryListEvent): void => {
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
      theme
    }),
    [theme]
  )

  const themeContextValue = useMemo(() => ({
    setTheme: (newTheme: string) => {
      let themeToApply: Theme;

      switch (newTheme) {
        case 'light':
          themeToApply = lightTheme;
          localStorage.setItem('darksky-theme', 'light');
          break;
        case 'dim':
          themeToApply = dimTheme;
          localStorage.setItem('darksky-theme', 'dim');
          break;
        case 'dark':
          themeToApply = darkTheme;
          localStorage.setItem('darksky-theme', 'dark');
          break;
        case 'system': {
          const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          themeToApply = prefersDarkMode ? { ...darkTheme, theme: 'system' } : { ...lightTheme, theme: 'system' };
          localStorage.setItem('darksky-theme', 'system');
          break;
        }
        default:
          themeToApply = lightTheme;
          break;
      }
      setTheme(themeToApply);
    }
  }), []);

  return (
        <ThemeContext.Provider value={stateContextValue}>
            <SetThemeContext.Provider value={themeContextValue}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider >
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
}

export const useSetTheme = (): SetThemeContextType => {
  return useContext(SetThemeContext);
}
