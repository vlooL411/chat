import { ReactElement, CSSProperties } from 'react';
import styleModal from './modalwindow.module.sass';

type Props = {
	children?: ReactElement;
	style?: CSSProperties;
	className?: string;
	onOpen: () => boolean;
	onClose?: () => void;
};

const ModalWindow = ({
	children,
	style,
	className,
	onOpen,
	onClose,
}: Props): ReactElement => {
	const { modalwindow } = styleModal;

	return onOpen() ? (
		<div className='total' style={{ background: 'none' }}>
			<div
				className='total'
				style={{ backgroundColor: '#000000aa' }}
				onMouseDown={onClose}></div>
			<div style={style} className={`${modalwindow} ${className ?? ''}`}>
				{children}
			</div>
		</div>
	) : null;
};

export default ModalWindow;
