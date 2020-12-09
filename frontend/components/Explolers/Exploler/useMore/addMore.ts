import { SubscribeToMoreOptions } from '@apollo/client';
import {
	AddMessageDocument,
	AddMessageSubscription,
	MessagesQuery,
} from '@frontend/types';
import { last } from '@common/utils';

const addMore = (
	subscribeToMore: (options: SubscribeToMoreOptions<MessagesQuery>) => void,
): void =>
	subscribeToMore({
		document: AddMessageDocument,
		updateQuery: (prev, { subscriptionData, variables }) => {
			const AddMessage = ((subscriptionData?.data as unknown) as AddMessageSubscription)
				?.AddMessage;

			if (!AddMessage) return null;

			const lastMessage = AddMessage;
			const mess = prev?.Messages?.Chat?.messages;
			const lastElemID = last(mess)?._id;

			if (lastElemID == prev?.Messages?.InfoMore?.isEndDown)
				return {
					Messages: {
						Chat: { lastMessage },
						InfoMore: { isEndDown: lastMessage?._id },
					},
				} as MessagesQuery;

			variables.isIncoming = true;
			const messages = mess ? [...mess, AddMessage] : [AddMessage];
			return {
				Messages: {
					Chat: { lastMessage, messages },
					InfoMore: { isEndDown: lastMessage?._id },
				},
			};
		},
	});

export default addMore;
