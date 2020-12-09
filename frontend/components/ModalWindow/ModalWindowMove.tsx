import { MouseEvent, ReactElement, useRef, useState } from 'react';

import styleModal from './modalwindow.module.sass';

type Props = {
	children?: ReactElement;
	className?: string;
	visible?: boolean;
};

const ModalWindowMove = ({
	children,
	className = '',
	visible = true,
}: Props): ReactElement => {
	const { modalwindow, movewindow } = styleModal;
	const modalRef = useRef<HTMLDivElement>(null!);
	const totalRef = useRef<HTMLDivElement>(null!);
	const [keep, setKeep] = useState<boolean>(false);

	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (e.buttons != 1 || !keep) return;
		const { clientX, clientY } = e;
		const { current } = modalRef;
		const { clientWidth } = current;
		current.style.top = `${clientY}px`;
		current.style.left = `calc(${clientX}px - ${clientWidth}px / 2)`;
	};

	return (
		visible && (
			<div ref={totalRef} className='total' onMouseMove={onMouseMove}>
				<div ref={modalRef} className={`${modalwindow} ${className}`}>
					<div
						className={movewindow}
						onMouseDown={() => setKeep(true)}
						onMouseUp={() => setKeep(false)}></div>
					{children}
				</div>
			</div>
		)
	);
};

export default ModalWindowMove;
