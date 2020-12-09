import { ReactElement } from 'react';

import styleModal from './modalwindow.module.sass';

type Props = {
	children?: ReactElement;
	className?: string;
	onOpen: () => boolean;
	onClose?: () => void;
};

const ModalWindow = ({
	children,
	className = '',
	onOpen,
	onClose,
}: Props): ReactElement => {
	const { modalwindow } = styleModal;

	return (
		onOpen() && (
			<div className='total' style={{ background: 'none' }}>
				<div
					className='total'
					style={{ backgroundColor: '#000000aa' }}
					onMouseDown={onClose}></div>
				<div className={`${modalwindow} ${className}`}>{children}</div>
			</div>
		)
	);
};

export default ModalWindow;
