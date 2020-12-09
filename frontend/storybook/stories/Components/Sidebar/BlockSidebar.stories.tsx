import BlockSidebar from 'components/Sidebar/BlockSidebar';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';

export default { title: 'Sidebar/BlockSidebar' };

export const toStorybook = (): ReactElement => (
	<BlockSidebar className='' sideblock={{ fa: faTable, text: 'Table' }} />
);
