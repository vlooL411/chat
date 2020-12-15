import { SubscribeToMoreOptions } from '@apollo/client';
import {
	ChatsQuery,
	DeleteChatDocument,
	RemoveChatMutation,
} from '@frontend/types';

const remMore = (
	subscribeToMore: (options: SubscribeToMoreOptions<ChatsQuery>) => void,
): void =>
	subscribeToMore({
		document: DeleteChatDocument,
		updateQuery: (prev, { subscriptionData /* , variables */ }) => {
			const { data } = subscriptionData;

			const RemoveChat = ((data as unknown) as RemoveChatMutation)
				?.RemoveChat;
			if (!RemoveChat) return null;

			const chats = prev?.Chats?.filter(
				chat => chat._id != RemoveChat._id,
			);
			// const chats_id = prev?.UserCurrent?.chats_id.filter(
			// 	id => id != RemoveChat._id,
			// );

			// variables.isIncoming = true;
			return {
				Chats: chats,
				// UserCurrent: {
				// 	_id: data?.UserCurrent?._id,
				// 	chats_id: chats_id,
				// },
			};
		},
	});

export default remMore;
