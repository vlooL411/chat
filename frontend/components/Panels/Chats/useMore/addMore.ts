import { SubscribeToMoreOptions } from '@apollo/client';
import {
	AddChatDocument,
	AddChatSubscription,
	Chat,
	ChatsQuery,
} from '@frontend/types';

const addMore = (
	subscribeToMore: (options: SubscribeToMoreOptions<ChatsQuery>) => void,
): void =>
	subscribeToMore({
		document: AddChatDocument,
		updateQuery: (_, { subscriptionData /* , variables */ }) => {
			const data = subscriptionData?.data;

			const AddChat = ((data as unknown) as AddChatSubscription)
				?.AddChat as Chat;
			if (!AddChat) return null;

			// variables.isIncoming = true;
			return {
				Chats: [AddChat],
				// UserCurrent: {
				// 	_id: data?.UserCurrent?._id,
				// 	chats_id: [AddChat?._id],
				// },
			};
		},
	});

export default addMore;
