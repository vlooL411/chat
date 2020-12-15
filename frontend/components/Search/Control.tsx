import Search from 'components/Search';
import { ReactElement, useState } from 'react';

type Props = {
	children: ReactElement[];
	onRun?: (text: string) => void;
	onStop?: () => void;
	loading?: boolean;
	className?: string;
};

const SearchControl = ({
	children,
	onRun = () => null,
	onStop = () => null,
	loading = false,
	className = '',
}: Props): ReactElement => {
	if (children?.length !== 2)
		console.error(
			'Children must contain 2 components: if is search first else second',
		);

	const [state, setState] = useState<{ isSearch?: boolean; date?: Date }>({});

	const onRunFind = (text: string): void => {
		state.isSearch = true;
		onRun(text);
	};
	const onStopFind = (): void => {
		setState({});
		onStop();
	};

	const onFindChatsMess = (text: string) => {
		if (!text) {
			state.date = null;
			onStopFind();
			return;
		}

		const date = new Date();
		state.date = date;
		setTimeout(() => {
			if (state.date === date) onRunFind(text);
		}, 400);
	};

	return (
		<div className={className}>
			<Search
				loading={loading}
				onClick={() => null}
				onClear={onStopFind}
				onChange={e => onFindChatsMess(e?.target?.value)}
			/>
			{state.isSearch ? children[0] : children[1]}
		</div>
	);
};

export default SearchControl;
