import { Message } from "./types";
import { InMemoryCacheConfig } from "@apollo/client";

export const CacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Chat: {
      fields: {
        messages: {
          merge: (existing: Message[], incoming: Message[]) => {
            // console.log("messages merge", existing, incoming);
            const messages = incoming?.map((el) => el);
            existing?.map((el) => messages.push(el));
            return messages;
          },
        },
      },
    },
    Query: {
      fields: {
        Chats: {
          merge: (_, incoming) => {
            // console.log("Chats", _, incoming);
            return incoming;
          },
        },
        Messages: {
          merge: (existing, incoming) => {
            // console.log("Merge messages", existing, incoming);
            return incoming;
          },
        },
      },
    },
  },
};
