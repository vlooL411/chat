import { ID } from "@types";
import { InMemoryCacheConfig } from "@apollo/client";

type EI = {
  __ref: ID; //__types:_id
};

const MergeDefault = { merge: (_: EI[], incoming: EI[]) => incoming };
const MergeAdding = {
  merge: (existing: EI[], incoming: EI[], { variables }) => {
    const isIncoming = variables?.isIncoming;
    if (!isIncoming && (!incoming || incoming?.length < 1)) return existing;
    if (isIncoming || !existing || existing?.length < 1) return incoming;

    const limit = variables?.limit;
    const messages = incoming?.filter(
      (inel) =>
        inel != null &&
        existing?.findIndex((el) => el.__ref == inel.__ref) == -1
    );
    if (limit < 0) return [...messages, ...existing];
    else return [...existing, ...messages];
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
