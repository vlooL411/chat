import { ReactElement, useContext } from 'react';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './changeThemes.module.sass';
import { ThemeContext } from '.';

type Props = { className?: string };

const ChangeTheme = ({ className = '' }: Props): ReactElement => {
	const { changetheme } = style;
	const { theme, toggleThemes } = useContext(ThemeContext);

	return (
		<button
			className={`${changetheme} ${className}`}
			onClick={() => toggleThemes(theme == 'light' ? 'dark' : 'light')}>
			<FontAwesomeIcon icon={faSun} />
		</button>
	);
};

export default ChangeTheme;
