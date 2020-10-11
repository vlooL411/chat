import { gql } from '@apollo/client'

export default gql`
  scalar Date

  type InfoMore {
    _id: ID
    isEndUp: ID
    isEndDown: ID
    lastIndex: ID
    size: Int
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    status: String
    chats_id: [ID]
    contacts: [Contact]
    isClosed: Boolean
    isOnlineMobile: Boolean
    dateLastOnline: Date
  }

  type Contact {
    _id: ID!
    userid: ID!
    date: Date!
    whoIsContact: String
    User: User
  }

  type Message {
    _id: ID!
    userid: ID!
    date: Date!
    text: String
    attachments: [String]
    isSend: Boolean
    isRead: Boolean
    isChange: Boolean
    isFavorite: Boolean
  }

  enum Creater {
    Contact
    Chat
  }

  enum Access {
    Public
    Private
    Squad
    Duo
    Own
  }

  type Chat {
    _id: ID!
    title: String!
    image: String
    date: Date!
    creaters_id: [ID]!
    creater: Creater!
    access: Access!
    lastMessage: Message
    users_id: [ID]
    messages: [Message]
  }

  type Messages {
    Chat: Chat!
    InfoMore: InfoMore
  }

  type Contacts {
    Existing: [Contact]
    Incoming: [Contact]
  }

  type Query {
    UpdateOnlineUser: String

    User(id: ID!): User
    UserCurrent: User
    UserID(name: String, email: String): User
    Users(start: Int!, end: Int!): [User]
    Contacts: [Contact]

    Chat(chatid: ID!): Chat
    Chats(chatid: ID, limit: Int, isIncoming: Boolean): [Chat]

    Messages(
      chatid: ID!
      messageid: ID
      limit: Int
      isIncoming: Boolean
    ): Messages

    FindChat(title: String!): [Chat]
    FindMessage(text: String!): [Chat]
    FindContact(text: String!): Contacts
  }

  type Mutation {
    InviteChat(chatid: ID!): String
    LeaveChat(chatid: ID!): String
    CreateChat(title: String!): String
    RemoveChat(chatid: ID!): String

    SendMessage(chatid: ID!, text: String!): String
    ChangeMessage(chatid: ID!, messageid: ID!, text: String!): String
    RemoveMessage(chatid: ID!, messageid: ID!): String
  }

  type Subscription {
    AddChat: Chat
    DeleteChat: Chat

    AddMessage: Message
    SwapMessage: Message
    DeleteMessage: Message
  }
`;
