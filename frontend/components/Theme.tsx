import { LocalStorage } from '@common/utils'
import { createContext, ReactElement, useEffect, useState } from 'react'

//название css стилей .light
//../styles/themes/*.sass
export type Themes = "light" | "dark"
const DefaultTheme: Themes = 'dark'

type ThemeProps = {
  theme: Themes;
  toggleThemes: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeProps>({
  theme: DefaultTheme,
  toggleThemes: null,
});

type ThemeProviderProps = {
  children: ReactElement | ReactElement[]
  defaultTheme?: Themes
}

export const ThemeProvider = ({ children, defaultTheme = DefaultTheme }: ThemeProviderProps): ReactElement => {
  const [theme, setTheme] = useState<Themes>(defaultTheme);

  useEffect(() => {
    const themeLocal = LocalStorage.getString('Theme', '', defaultTheme) as Themes
    setTheme(themeLocal)
  }, [])

  useEffect(() => LocalStorage.setString('Theme', '', theme), [theme])

  return <ThemeContext.Provider
    value={{ theme, toggleThemes: setTheme }}>
    <div className={theme}>
      {children}
    </div>
  </ThemeContext.Provider>
}