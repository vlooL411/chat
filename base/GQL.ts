import { gql } from "@apollo/client";
import { Fragment } from "apolloclient/fragment";

export namespace GQL {
  export namespace Query {
    export const User = gql`
      query user($id: ID!) {
        User(id: $id) {
          ...UserInfo
        }
      }
      ${Fragment.UserInfo}
    `;
    export const UserCurrent = gql`
      query {
        UserCurrent {
          ...UserInfo
        }
      }
      ${Fragment.UserInfo}
    `;

    export const Chat = gql`
      query chat($chatid: ID!) {
        Chat(chatid: $chatid) {
          ...ChatInfo
          ...LastMessage
        }
      }
      ${Fragment.ChatInfo}
      ${Fragment.LastMessage}
    `;

    export const Messages = gql`
      query messages(
        $chatid: ID!
        $messageid: ID
        $limit: Int
        $isIncoming: Boolean = false
      ) {
        Messages(
          chatid: $chatid
          messageid: $messageid
          limit: $limit
          isIncoming: $isIncoming
        ) {
          Chat {
            _id
            ...ChatMessages
            ...LastMessage
          }
          InfoMore {
            ...InfoMore
          }
        }
      }
      ${Fragment.InfoMore}
      ${Fragment.LastMessage}
      ${Fragment.ChatMessages}
    `;
  }
  export namespace Mutation {
    export const InviteChat = gql`
      mutation inviteChat($chatid: ID!) {
        InviteChat(chatid: $chatid)
      }
    `;
    export const LeaveChat = gql`
      mutation leaveChat($chatid: ID!) {
        LeaveChat(chatid: $chatid)
      }
    `;
    export const RemoveChat = gql`
      mutation removeChat($chatid: ID!) {
        RemoveChat(chatid: $chatid)
      }
    `;

    export const SendMessage = gql`
      mutation sendMessage($chatid: ID!, $text: String!) {
        SendMessage(chatid: $chatid, text: $text)
      }
    `;

    export const ChangeMessage = gql`
      mutation changeMessage($chatid: ID!, $messageid: ID!, $text: String!) {
        ChangeMessage(chatid: $chatid, messageid: $messageid, text: $text)
      }
    `;

    export const RemoveMessage = gql`
      mutation removeMessage($chatid: ID!, $messageid: ID!) {
        RemoveMessage(chatid: $chatid, messageid: $messageid)
      }
    `;
  }
  export namespace Subscription {
    export const AddChat = gql`
      subscription {
        AddChat {
          ...ChatInfo
          lastMessage {
            _id
            text
          }
        }
      }
      ${Fragment.ChatInfo}
    `;

    export const RemoveChat = gql`
      subscription {
        RemoveChat {
          _id
        }
      }
    `;

    export const AddMessage = gql`
      subscription {
        AddMessage {
          _id
          userid
          text
          date
          isChange
        }
      }
    `;

    export const ChangeMessage = gql`
      subscription {
        ChangeMessage {
          _id
          text
          isChange
        }
      }
    `;

    export const RemoveMessage = gql`
      subscription {
        RemoveMessage {
          _id
        }
      }
    `;
  }
}
