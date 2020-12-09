import { createContext, ReactElement, useEffect, useState } from 'react';

//название css стилей .light
//../styles/themes/*.sass
export type Themes = 'light' | 'dark';
const DefaultTheme: Themes = 'dark';

type ThemeProps = {
	theme: Themes;
	toggleThemes: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeProps>({
	theme: DefaultTheme,
	toggleThemes: null,
});

type ThemeProviderProps = {
	children: ReactElement | ReactElement[];
	className?: string;
	defaultTheme?: Themes;
};

export const ThemeProvider = ({
	children,
	className = '',
	defaultTheme = DefaultTheme,
}: ThemeProviderProps): ReactElement => {
	const [theme, setTheme] = useState<Themes>(defaultTheme);

	useEffect(() => {
		const themeLocal: Themes =
			(localStorage.getItem(`Theme`) as Themes) ?? defaultTheme;
		setTheme(themeLocal);
	}, []);

	useEffect(() => localStorage.setItem('Theme', theme), [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleThemes: setTheme }}>
			<div className={`${theme} ${className}`}>{children}</div>
		</ThemeContext.Provider>
	);
};
