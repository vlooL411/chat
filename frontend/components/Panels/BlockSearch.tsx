import Search from 'components/Search';
import { ReactElement, useState } from 'react';
import { useFindQueryChatLazyQuery } from '@frontend/types';

type Props = {
	onRun: () => void;
	onStop: () => void;
};

const BlockSearch = ({}: Props): ReactElement => {
	const [state, setState] = useState<{ IsSearch?: boolean; Date?: Date }>({});

	const onRunFind = (text: string): void => {
		state.IsSearch = true;
		getFind({ variables: { text } });
	};
	const onStopFind = (): void => setState({});

	const [
		getFind,
		{ loading: loadFind, data: dataFind },
	] = useFindQueryChatLazyQuery({ fetchPolicy: 'no-cache' });

	const onFindChatsMess = (text: string) => {
		if (!text) {
			state.Date = null;
			onStopFind();
			return;
		}

		const date = new Date();
		state.Date = date;
		setTimeout(() => {
			if (state.Date == date) onRunFind(text);
		}, 400);
	};

	const dataFindChats = dataFind?.FindChat;
	const dataFindMess = dataFind?.FindMessage;

	const countFindChats: number = dataFindChats?.length;
	const countFindMess: number = dataFindMess?.reduce(
		(sum, { messages }) => sum + (messages ? messages.length : 0),
		0,
	);

	return (
		<Search
			loading={loadFind}
			onClick={() => null}
			onClear={onStopFind}
			onChange={e => onFindChatsMess(e?.target?.value)}
		/>
	);
};

export default BlockSearch;
