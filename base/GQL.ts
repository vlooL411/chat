import { gql } from "@apollo/client";

export namespace GQL {
  export namespace Query {
    export const User = gql`
      query user($id: ID!) {
        User(id: $id) {
          _id
          name
          image
          status
          isOnline
          isOnlineMobile
          dateLastOnline
        }
      }
    `;
    export const UserCurrent = gql`
      query {
        UserCurrent {
          _id
          name
          image
          chats_id
          isOnline
          isOnlineMobile
          dateLastOnline
        }
      }
    `;

    export const Chat = gql`
      query chat($chatid: ID!) {
        Chat(chatid: $chatid) {
          _id
          date
          title
          creater
          creater_id
          access
          lastMessage {
            _id
            text
          }
        }
      }
    `;

    export const Messages = gql`
      query messages($chatid: ID!, $lastMessageID: ID, $limit: Int) {
        Messages(
          chatid: $chatid
          lastMessageID: $lastMessageID
          limit: $limit
        ) {
          Chat {
            _id
            lastMessage {
              _id
              text
            }
            messages {
              _id
              userid
              text
              date
              isChange
            }
          }
          InfoMore {
            lastIndex
            size
            isEnd
          }
        }
      }
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
          _id
          title
          image
          date
          creater
          creater_id
          access
          lastMessage {
            _id
            text
          }
        }
      }
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
          text
          date
          userid
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
