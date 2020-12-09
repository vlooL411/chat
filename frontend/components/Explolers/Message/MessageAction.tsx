import Loader from 'components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent, ReactElement } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	faAnchor,
	faArrowRight,
	faCheck,
	faEdit,
	faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import {
	Message,
	useChangeMessageMutation,
	useSendMessageMutation,
} from '@frontend/types';

import style from './styles/messageAction.module.sass';
import TextAreaMessage from './TextAreaMessage';

export type MessageActionMode = { mes?: Message; mode: 'send' | 'change' };
const sendInit = (): MessageActionMode => ({ mes: null, mode: 'send' });

type Props = {
	chatid: string;
	action?: MessageActionMode;
};

const MessageAction = ({
	chatid,
	action = sendInit(),
}: Props): ReactElement => {
	const { message, message_send, message_change } = style;

	const textBlockRef = useRef<HTMLTextAreaElement>(null!);
	const [currentMode, setCurrentMode] = useState<MessageActionMode>(action);

	const [sendMessage, { loading: loadingSend }] = useSendMessageMutation();
	const [
		changeMessage,
		{ loading: loadingChange },
	] = useChangeMessageMutation();

	useEffect(() => {
		setCurrentMode(action);
		textBlockRef.current.value = action?.mes?.text ?? '';
	}, [action]);

	const mes = currentMode?.mes;
	const mode = currentMode?.mode;

	const isModeSend = mode == 'send';

	const setTextBlockEmpty = (): void => {
		textBlockRef.current.value = '';
	};

	const resetSend = (): void => {
		setCurrentMode(sendInit());
		setTextBlockEmpty();
	};

	const onSend = (): void => {
		const { value: text } = textBlockRef?.current;
		if (!text || !chatid) return;

		sendMessage({ variables: { chatid, text } });
		setTextBlockEmpty();
	};

	const onChange = (): void => {
		const { value: text } = textBlockRef.current;
		if (!text || !mes || text == mes?.text) return;

		changeMessage({ variables: { chatid, messageid: mes?._id, text } });
		resetSend();
	};

	const onMessageKey = (
		e: KeyboardEvent<HTMLTextAreaElement>,
		action: () => void,
	): boolean => {
		if (e.ctrlKey && e.key == 'Enter') {
			action();
			return true;
		}
	};

	const Change = useMemo<ReactElement>(
		() =>
			!isModeSend && (
				<div className={message_change}>
					<FontAwesomeIcon icon={faEdit} />
					<span>Editable message</span>
					<p>{mes?.text}</p>
					<FontAwesomeIcon icon={faAnchor} onClick={resetSend} />
				</div>
			),
		[currentMode],
	);

	const onAction = isModeSend ? onSend : onChange;
	return (
		<div className={message}>
			{Change}
			<div className={message_send}>
				{loadingSend || loadingChange ? (
					<Loader loading />
				) : (
					<FontAwesomeIcon icon={faPaperclip} />
				)}
				<TextAreaMessage
					ref={textBlockRef}
					onKeyDownToAreaChange={e => onMessageKey(e, onAction)}
					placeholder={`${
						isModeSend ? 'Write' : 'Edit'
					} a message...`}
				/>
				<button onClick={onAction}>
					<FontAwesomeIcon
						icon={isModeSend ? faArrowRight : faCheck}
					/>
				</button>
			</div>
		</div>
	);
};

export default MessageAction;
