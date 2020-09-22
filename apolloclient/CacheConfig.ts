import { ID } from "@types";
import { InMemoryCacheConfig } from "@apollo/client";

type EI = {
  __ref: ID; //__types:_id
};

const MergeDefault = { merge: (_, incoming) => incoming };

export const CacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Chat: {
      fields: {
        messages: {
          merge: (existing: EI[], incoming: EI[], { variables }) => {
            // console.log("merge messages", existing, incoming, variables);
            if (!incoming || incoming?.length < 1) return existing;

            const isIncoming = variables?.isIncoming;
            if (isIncoming || !existing || existing?.length < 1)
              return incoming;

            const limit = variables?.limit;
            const messages = incoming?.filter(
              (inel) =>
                existing?.findIndex((el) => el.__ref == inel?.__ref) == -1
            );
            if (limit < 0) return [...messages, ...existing];
            else return [...existing, ...messages];
          },
        },
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
