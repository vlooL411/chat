import { gql } from "@apollo/client";

export namespace Fragment {
  export const UserInfo = gql`
    fragment UserInfo on User {
      _id
      name
      image
      status
      isOnline
      isOnlineMobile
      dateLastOnline
    }
  `;
  export const ChatInfo = gql`
    fragment ChatInfo on Chat {
      _id
      title
      image
      date
      creater
      creater_id
      access
    }
  `;
  export const InfoMore = gql`
    fragment InfoMore on InfoMore {
      size
      isEndUp
      isEndDown
      lastIndex
    }
  `;
  export const ChatMessages = gql`
    fragment ChatMessages on Chat {
      messages {
        _id
        userid
        text
        date
        isChange
      }
    }
  `;

  export const LastMessage = gql`
    fragment LastMessage on Chat {
      lastMessage {
        _id
        text
        date
      }
    }
  `;
}
