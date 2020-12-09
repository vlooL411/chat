import { ReactElement } from 'react';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'components/Theme';

import style from './changeThemes.module.sass';

type Props = { className?: string };

const ChangeThemes = ({ className = '' }: Props): ReactElement => {
	const { changetheme } = style;

	return (
		<ThemeContext.Consumer>
			{({ theme, toggleThemes }) => (
				<button
					className={`${changetheme} ${className}`}
					onClick={() =>
						toggleThemes(theme == 'light' ? 'dark' : 'light')
					}>
					<FontAwesomeIcon icon={faSun} />
				</button>
			)}
		</ThemeContext.Consumer>
	);
};

export default ChangeThemes;
