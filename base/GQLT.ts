import { API } from "@API";
import { GQL } from "@GQL";
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
  DocumentNode,
  LazyQueryHookOptions,
  QueryHookOptions,
  MutationHookOptions,
  SubscriptionHookOptions,
} from "@apollo/client";
import { User, Chat, Message, Messages } from "@types";

type Node = DocumentNode;
type Query<T, V> = QueryHookOptions<T, V>;
type Lazy<T, V> = LazyQueryHookOptions<T, V>;
type Mutation<T, V> = MutationHookOptions<T, V>;
type Subscription<T, V> = SubscriptionHookOptions<T, V>;

//TODO find a better solution, !!!!!!!!!!!!!!
export namespace GQLT {
  export namespace Query {
    //#region User
    export const useUser = <
      T extends { UserCurrent: User },
      V extends API.User.GetBody
    >(
      options?: Query<T, V>,
      query: Node = GQL.Query.User
    ) => useQuery<T, V>(query, options);
    export const useUserLazy = <
      T extends { UserCurrent: User },
      V extends API.User.GetBody
    >(
      options?: Lazy<T, V>,
      query: Node = GQL.Query.User
    ) => useLazyQuery<T, V>(query, options);
    //#endregion
    //#region UserCurrent
    export const useUserCurrent = <
      T extends { UserCurrent: User },
      V extends never
    >(
      options?: Query<T, V>,
      query: Node = GQL.Query.UserCurrent
    ) => useQuery<T, V>(query, options);
    export const useUserCurrentLazy = <
      T extends { UserCurrent: User },
      V extends never
    >(
      options?: Lazy<T, V>,
      query: Node = GQL.Query.UserCurrent
    ) => useLazyQuery<T, V>(query, options);
    //#endregion

    //#region Chat
    export const useChat = <
      T extends { Chat: Chat },
      V extends API.Chat.GetBody
    >(
      options?: Query<T, V>,
      query: Node = GQL.Query.Chat
    ) => useQuery<T, V>(query, options);
    export const useChatLazy = <
      T extends { Chat: Chat },
      V extends API.Chat.GetBody
    >(
      query: Node = GQL.Query.Chat,
      options?: Lazy<T, V>
    ) => useLazyQuery<T, V>(query, options);
    //#endregion

    //#region Messages
    type MessagesBody = API.Message.GetsBody & { isIncoming: Boolean };
    export const useMessages = <
      T extends { Messages: Messages },
      V extends MessagesBody
    >(
      options?: Query<T, V>,
      query: Node = GQL.Query.Messages
    ) => useQuery<T, V>(query, options);
    export const useMessagesLazy = <
      T extends { Messages: Messages },
      V extends MessagesBody
    >(
      options?: Lazy<T, V>,
      query: Node = GQL.Query.Messages
    ) => useLazyQuery<T, V>(query, options);
    //#endregion
  }
  export namespace Mutation {
    //#region InviteChat
    export const useInviteChat = <
      T extends { data: string },
      V extends API.Chat.InviteBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.InviteChat
    ) => useMutation<T, V>(query, options);
    //#endregion
    //#region LeaveChat
    export const useLeaveChat = <
      T extends { data: string },
      V extends API.Chat.LeaveBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.LeaveChat
    ) => useMutation<T, V>(query, options);
    //#endregion
    //#region RemoveChat
    export const useRemoveChat = <
      T extends { data: string },
      V extends API.Chat.RemoveBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.RemoveChat
    ) => useMutation<T, V>(query, options);
    //#endregion

    //#region SendMessage
    export const useSendMessage = <
      T extends { data: string },
      V extends API.Message.SendBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.SendMessage
    ) => useMutation<T, V>(query, options);
    //#endregion
    //#region ChangeMessage
    export const useChangeMessage = <
      T extends { data: string },
      V extends API.Message.ChangeBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.ChangeMessage
    ) => useMutation<T, V>(query, options);
    //#endregion
    //#region RemoveMessage
    export const useRemoveMessage = <
      T extends { data: string },
      V extends API.Message.RemoveBody
    >(
      options?: Mutation<T, V>,
      query: Node = GQL.Mutation.RemoveMessage
    ) => useMutation<T, V>(query, options);
    //#endregion
  }
  export namespace Subscription {
    //#region AddChat
    export const useAddChat = <T extends { AddChat: Chat }, V extends never>(
      options?: Subscription<T, V>,
      query: Node = GQL.Subscription.AddChat
    ) => useSubscription<T, V>(query, options);
    //#endregion
    //#region RemoveChat
    export const useRemoveChat = <
      T extends { RemoveChat: Chat },
      V extends never
    >(
      options?: Subscription<T, V>,
      query: Node = GQL.Subscription.RemoveChat
    ) => useSubscription<T, V>(query, options);
    //#endregion

    //#region AddMessage
    export const useAddMessage = <
      T extends { AddMessage: Chat },
      V extends never
    >(
      options?: Subscription<T, V>,
      query: Node = GQL.Subscription.AddMessage
    ) => useSubscription<T, V>(query, options);
    //#endregion
    //#region ChangeMessage
    export const useChangeMessage = <
      T extends { ChangeMessage: Message },
      V extends never
    >(
      options?: Subscription<T, V>,
      query: Node = GQL.Subscription.ChangeMessage
    ) => useSubscription<T, V>(query, options);
    //#endregion
    //#region RemoveMessage
    export const useRemoveMessage = <
      T extends { RemoveMessage: Message },
      V extends never
    >(
      options?: Subscription<T, V>,
      query: Node = GQL.Subscription.RemoveMessage
    ) => useSubscription<T, V>(query, options);
    //#endregion
  }
}
