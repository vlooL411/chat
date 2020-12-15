import ChangeTheme from 'components/Theme/Change';
import useSignOut from 'hooks/useSignOut';
import { ReactElement, useMemo, useState } from 'react';
import { faAlignJustify, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { UserInfoFragment, useUserCurrentQuery } from '@frontend/types';

import style from './sidebar.module.sass';
import BlockSidebar, { SidebarBlock } from './BlockSidebar';

type Props = {
	faBlocks: SidebarBlock[];
	extendBlocks?: SidebarBlock[];
};

const { EMPTY_AVATAR_USER } = process.env;
const Sidebar = ({ faBlocks, extendBlocks }: Props): ReactElement => {
	const { sidebar, sidebar_default, sidebar_block } = style;
	const { extend, extend_on, extend_off, extend_block, total } = style;

	const [isExtend, setIsExtend] = useState<boolean>(false);
	const { data } = useUserCurrentQuery();
	const onSignOut = useSignOut();

	const BlockUser = useMemo<ReactElement>(() => {
		const user: UserInfoFragment = data?.UserCurrent;
		const { blockuser, login, email } = style;

		return (
			<div className={blockuser}>
				<img src={user?.avatar ?? EMPTY_AVATAR_USER} />
				<p className={login}>{user?.name}</p>
				<p className={email}>{user?.email}</p>
			</div>
		);
	}, [data]);

	const blocks = useMemo<ReactElement[]>(
		() =>
			faBlocks?.map((sideblock, key) => (
				<BlockSidebar
					key={key}
					sideblock={sideblock}
					className={sidebar_block}
				/>
			)),
		[faBlocks],
	);

	const blocksExtend = useMemo<ReactElement[]>(
		() =>
			extendBlocks?.map((sideblock, key) => (
				<BlockSidebar
					key={key}
					sideblock={sideblock}
					className={extend_block}
				/>
			)),
		[extendBlocks],
	);

	const onExtend = () => setIsExtend(true);
	const onUnextend = () => setIsExtend(false);

	return (
		<>
			<div className={isExtend ? `total ${total}` : ''}>
				<div
					className={`${extend} ${
						isExtend ? extend_on : extend_off
					}`}>
					{BlockUser}
					{blocksExtend}
					<ChangeTheme className={sidebar_block} />
				</div>
				<div
					className={isExtend ? 'total' : ''}
					onMouseDown={onUnextend}
				/>
			</div>
			<div className={sidebar}>
				<div className={sidebar_default}>
					<BlockSidebar
						className={sidebar_block}
						sideblock={{
							fa: faAlignJustify,
							text: '',
							onClick: onExtend,
						}}
					/>
					{blocks}
					<BlockSidebar
						className={sidebar_block}
						sideblock={{
							fa: faDoorOpen,
							text: 'Exit',
							onClick: onSignOut,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
