import { SubscribeToMoreOptions } from '@apollo/client';
import {
	DeleteMessageDocument,
	DeleteMessageSubscription,
	MessagesQuery,
} from '@frontend/types';

const remMore = (
	subscribeToMore: (options: SubscribeToMoreOptions<MessagesQuery>) => void,
): void =>
	subscribeToMore({
		document: DeleteMessageDocument,
		updateQuery: (prev, { subscriptionData, variables }) => {
			const DeleteMessage = ((subscriptionData?.data as unknown) as DeleteMessageSubscription)
				?.DeleteMessage;

			if (!DeleteMessage) return null;

			variables.isIncoming = true;
			const messages = prev?.Messages?.Chat?.messages?.filter(
				el => el._id != DeleteMessage._id,
			);
			return { Messages: { Chat: { messages } } };
		},
	});

export default remMore;
