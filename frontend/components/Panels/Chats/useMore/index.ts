import { SubscribeToMoreOptions } from '@apollo/client';
import { ChatsQuery } from '@frontend/types';
import { useEffect } from 'react';

import addMore from './addMore';
import remMore from './remMore';

const useMore = (
	subscribeToMore: (options: SubscribeToMoreOptions<ChatsQuery>) => void,
): void =>
	useEffect(() => {
		if (!subscribeToMore) return;
		addMore(subscribeToMore);
		remMore(subscribeToMore);
	}, [subscribeToMore]);

export default useMore;
