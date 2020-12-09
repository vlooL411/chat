import Search from 'components/Search';
import BlockInfo from 'components/Search/BlockInfo';
import { ReactElement } from 'react';

// import BlockPanel from 'components/Panels/BlockPanel';
export default { title: 'Components/Search' };

// const RandDate = (): Date =>
// 	new Date(new Date().getTime() - Math.random() * 10000);
// const DateAdd = (date: Date, minute: number): string =>
// 	new Date(date.getTime() + minute * 1000 * 60).toDateString();

export const Default = (): ReactElement => <Search />;

export const SearchChatEmpty = (): ReactElement => (
	<>
		<Search />
		<BlockInfo what='Founds chats 0' />
		<BlockInfo what='Founds messages 0' />
	</>
);
