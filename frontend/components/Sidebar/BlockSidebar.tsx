import Link from 'next/link';
import {
	faThermometerEmpty,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';

export type SidebarBlock = {
	fa: IconDefinition;
	text: string;
	href?: string;
	onClick?: () => void;
};

type Props = {
	className?: string;
	sideblock: SidebarBlock;
};

const BlockSidebar = ({ className = '', sideblock }: Props): ReactElement => {
	const { fa, text, href, onClick } = sideblock;

	const Wrap = ({ children }: { children: ReactElement }) =>
		href ? (
			<Link href={href ?? '/'} prefetch={false}>
				{children}
			</Link>
		) : (
			children
		);

	return (
		<Wrap>
			<button className={className} onClick={onClick}>
				<FontAwesomeIcon icon={fa ?? faThermometerEmpty} />
				<p>{text}</p>
			</button>
		</Wrap>
	);
};

export default BlockSidebar;
