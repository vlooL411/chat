import Loader from 'components/Loader';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import style from './styles/search.module.sass';

type Props = {
	onClick?: () => void;
	onBlur?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	loading?: boolean;
};

const Search = ({
	onClick = () => null,
	onBlur = () => null,
	onChange = () => null,
	onClear = () => null,
	loading = false,
}: Props): ReactElement => {
	const { X, loader } = style;
	const { search, search_char } = style;
	const { container_search, container_search_media } = style;

	const inputRef = useRef<HTMLInputElement>(null!);
	const [mediaMinSearch, setMediaMinSearch] = useState<boolean>(false);

	const onBlurSearch = (): void => {
		setMediaMinSearch(true);
		onBlur();
	};

	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
		e.target.value == '' ? onClear() : onChange(e);
	};

	const onClearSearch = (): void => {
		inputRef.current.value = '';
		onClear();
	};

	const onClickSearch = (): void => {
		inputRef?.current?.focus();
		setMediaMinSearch(false);
		onClick();
	};

	const isInputEmpty = inputRef?.current?.value != '';
	return (
		<div
			className={`${container_search} ${
				mediaMinSearch ? container_search_media : ''
			}`}>
			<label className={search}>
				<input
					ref={inputRef}
					type='serch'
					placeholder='Search'
					maxLength={30}
					onChange={onChangeSearch}
					onBlur={onBlurSearch}
				/>
				{loading ? (
					<Loader className={loader} loading />
				) : (
					isInputEmpty && (
						<FontAwesomeIcon
							className={X}
							icon={faTimes}
							onClick={onClearSearch}
						/>
					)
				)}
			</label>
			<FontAwesomeIcon
				className={search_char}
				icon={faSearch}
				onClick={onClickSearch}
			/>
		</div>
	);
};

export default Search;
