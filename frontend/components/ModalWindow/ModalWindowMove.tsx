import {
	ReactElement,
	CSSProperties,
	useState,
	useRef,
	MouseEvent,
} from 'react';
import styleModal from './modalwindow.module.sass';

type Props = {
	children?: ReactElement;
	style?: CSSProperties;
	className?: string;
	visible?: boolean;
};

const ModalWindowMove = ({
	children,
	style,
	className,
	visible = true,
}: Props): ReactElement => {
	const { modalwindow, movewindow } = styleModal;
	const modalRef = useRef<HTMLDivElement>(null!);
	const totalRef = useRef<HTMLDivElement>(null!);
	const [keep, setKeep] = useState<boolean>(false);

	const onMouseMove = (e: MouseEvent) => {
		if (e.buttons != 1 || !keep) return;
		const { clientX, clientY } = e;
		const { current } = modalRef;
		const {
			clientHeight: heightTotal,
			clientWidth: widthTotal,
		} = totalRef.current;
		const { clientHeight, clientWidth } = current;
		current.style.top = `${clientY}px`;
		current.style.left = `calc(${clientX}px - ${clientWidth}px / 2)`;
	};

	return visible ? (
		<div ref={totalRef} className='total' onMouseMove={e => onMouseMove(e)}>
			<div
				ref={modalRef}
				style={style}
				className={`${modalwindow} ${className ?? ''}`}>
				<div
					className={movewindow}
					onMouseDown={() => setKeep(true)}
					onMouseUp={() => setKeep(false)}></div>
				{children}
			</div>
		</div>
	) : null;
};

export default ModalWindowMove;
