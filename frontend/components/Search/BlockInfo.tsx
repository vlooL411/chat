import { ReactElement } from 'react';

import style from './styles/blockinfo.module.sass';

type Props = {
	what?: string;
};

const BlockInfo = ({ what = 'what' }: Props): ReactElement => {
	const { info } = style;

	return <p className={info}>{what}</p>;
};

export default BlockInfo;
