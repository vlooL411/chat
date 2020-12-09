import { ReactElement } from 'react';

import style from './loader.module.sass';

type Props = {
	loading: boolean;
	className?: string;
	borderColor?: string;
};

const Loader = ({
	loading,
	className = '',
	borderColor = null,
}: Props): ReactElement => {
	const { circle } = style;

	return (
		loading && (
			<div className={`${circle} ${className}`} style={{ borderColor }} />
		)
	);
};

export default Loader;
