import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    status: String
    chats_id: [ID!]
    friends: [Friend]
    permissions: Int
    isOnline: Boolean
    isOnlineMobile: Boolean
    dateLastOnline: Date
  }

  type Friend {
    _id: ID!
    user_id: ID!
    date: Date!
    whoIsFriend: String
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

  enum ChatCreater {
    User
    Chat
  }

  type Chat {
    _id: ID!
    date: Date!
    creater_id: ID!
    creater: ChatCreater
    title: String!
    image: String
    users_id: [ID!]
    messages: [Message!]
    lastMessage: Message
    isNotifications: Boolean
  }

  type Query {
    User(id: ID!): User
    UserID(name: String, email: String): User
    Users(start: Int!, end: Int!): [User]
    Chat(id: ID!): Chat
    Chats(start: Int!, end: Int!): [Chat]
    Friends(userid: ID!): [Friend]
  }

  type Mutation {
    SendMessage(chatid: ID!, text: String!): String
    ChangeMessage(chatid: ID!, messageid: ID!, text: String!): String
    RemoveMessage(chatid: ID!, messageid: ID!): String
  }

  type Subscription {
    AddMessage(chatid: ID!, lastmessageid: ID): String
  }
`;
