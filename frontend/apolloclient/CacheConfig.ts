import { InMemoryCacheConfig } from '@apollo/client';

/* eslint-disable @typescript-eslint/no-explicit-any */
//Existing Incoming
type EI = {
	__ref: string; //string => __types:_id
};

const MergeDefault = { merge: (_: EI[], incoming: EI[]): EI[] => incoming };
const MergeAdding = {
	merge: (existing: EI[], incoming: EI[], { variables }): EI[] => {
		const isIncoming = variables?.isIncoming;
		if (!isIncoming && (!incoming || incoming?.length < 1)) return existing;
		if (isIncoming || !existing || existing?.length < 1) return incoming;

		const limit = variables?.limit;
		const messages = incoming?.filter(
			inel =>
				inel != null &&
				existing?.findIndex(el => el.__ref == inel.__ref) == -1,
		);
		return limit < 0
			? [...messages, ...existing]
			: [...existing, ...messages];
	},
};

export const CacheConfig: InMemoryCacheConfig = {
	typePolicies: {
		User: {
			fields: {
				chats_id: MergeAdding as any,
			},
		},
		Chat: {
			fields: {
				messages: MergeAdding as any,
			},
		},
		Query: {
			fields: {
				Chats: MergeDefault,
				Messages: MergeDefault,
			},
		},
	},
};
