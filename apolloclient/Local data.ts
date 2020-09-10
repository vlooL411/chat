import { Friend, User, Message, Chat, ChatCreater } from "./types";
import { GetYesterdey } from "../components/common/WhatDate";
import { IResolvers } from "apollo-server";

//#region Local data
const Friends = (userID: number): Friend[] =>
  Array.from(
    { length: 10 },
    (_, i) =>
      ({
        _id: i * userID,
        user_id: i,
        date: new Date(),
        whoIsFriend: `Title ${i}`,
      } as Friend)
  );

const Users: User[] = Array.from({ length: 10 }, (_, i) => ({
  _id: i,
  email: "",
  name: `Name ${i}`,
  password: `Pass ${i}`,
  status: Array(i * i)
    .fill(`Status ${i}`)
    .join(" "),
  chats_id: Array(i).fill(i),
  friends: Friends(i),
  isOnline: i % 2 == 0,
  isOnlineMobile: i % 4 == 0,
  dateLastOnline: i % 2 == 0 ? new Date() : GetYesterdey(new Date()),
}));

const Messages = (idChat: number, count: number): Message[] =>
  Array.from({ length: count }, (_, i) => ({
    _id: i,
    userid: Users[i]._id,
    date: new Date(),
    text: `Text ${idChat} ${i}`,
  }));

const Chats: Chat[] = Array.from({ length: 10 }, (_, i) => ({
  _id: i,
  creater_id: Users[i]._id,
  creater: ChatCreater.User,
  date: new Date(),
  title: `Title ${i}`,
  users: Array(i).fill(Users[i]),
  messages: Messages(i, i),
}));

//obj, args, context, info - Query
export const resolverss: IResolvers | IResolvers[] = {
  Query: {
    Users: (_, { start, end }): User[] => Users.slice(start, end),
    Chat: (_, { id }): Chat => Chats[Chats.findIndex((el) => el._id == id)],
    Chats: (_, { start, end }): Chat[] => {
      for (let i = 0; i < Chats.length; i++)
        Chats[i].lastMessage = Chats[i].messages[Chats[i].messages.length - 1];
      return Chats.slice(start, end);
    },
    Friends: (_, { id }): Friend => {
      const user = Users[Users.findIndex((el) => el._id == id)];
      return user.friends[user.friends.findIndex((el) => el.user_id == id)];
    },
  },
};
//#endregion