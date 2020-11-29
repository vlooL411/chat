import BlockPanel from 'components/Panels/BlockPanel';
import BlockInfo from 'components/Search/BlockInfo';
import React from 'react';

import Search from '../../../components/Search';

export default { title: 'Components/Search' };

const RandDate = (): Date =>
	new Date(new Date().getTime() - Math.random() * 10000);
const DateAdd = (date: Date, minute: number): string =>
	new Date(date.getTime() + minute * 1000 * 60).toDateString();

export const Default = () => <Search />;

export const SearchChatEmpty = () => (
	<>
		<Search />
		<BlockInfo what='Founds chats 0' />
		<BlockInfo what='Founds messages 0' />
	</>
);
