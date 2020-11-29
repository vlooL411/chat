import { ReactElement } from 'react';

import style from './styles/block.module.sass';

type Props = {
	title: string;
	image: string;
	children?: ReactElement;
};

const BarBlock = ({ title, image, children }: Props): ReactElement => {
	const { block, block_title } = style;

	return (
		<div className={block}>
			<img src={image} />
			<p className={block_title}>{title}</p>
			{children}
		</div>
	);
};

export default BarBlock;
