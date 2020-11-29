import Loader from 'components/Loader';
import { ChangeEvent, useRef, useState } from 'react';
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
}: Props) => {
	const {
		search,
		search_char,
		X,
		loader,
		container_search,
		container_search_media,
	} = style;
	const [mediaMinSearch, setMediaMinSearch] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null!);

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
					onChange={e => onChange(e)}
					onBlur={() => {
						setMediaMinSearch(true);
						onBlur();
					}}
				/>
				{loading ? (
					<Loader className={loader} loading={true} />
				) : inputRef?.current?.value != '' ? (
					<FontAwesomeIcon
						className={X}
						icon={faTimes}
						onClick={() => {
							inputRef.current.value = '';
							onClear();
						}}
					/>
				) : null}
			</label>
			<FontAwesomeIcon
				className={search_char}
				icon={faSearch}
				onClick={() => {
					inputRef?.current?.focus();
					setMediaMinSearch(false);
					onClick();
				}}
			/>
		</div>
	);
};

export default Search;
