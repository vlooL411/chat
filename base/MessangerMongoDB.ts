import { API } from "@API";
import { NextApiRequest } from "next";
import { Chat, User, Messages, IMessangerAsync } from "@types";

const { HOST_API } = process.env;

export default class MessangerMongoDB implements IMessangerAsync {
  async PostQuery<T>(
    relativeUrl: string,
    body,
    req: NextApiRequest
  ): Promise<T> {
    const data = await fetch(`${HOST_API}/${relativeUrl}`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: { ...req?.headers } as any,
    });

    return data.json().then((el) => el?.data);
  }

  //#region Query
  //#region User
  User = (body: API.User.GetBody, req: NextApiRequest): Promise<User> =>
    this.PostQuery("User", body, req);
  UserCurrent = (req: NextApiRequest): Promise<User> =>
    this.PostQuery("User/current", {}, req);

  UserID = (body: API.User.idBody, req: NextApiRequest = null): Promise<User> =>
    this.PostQuery("User/id", body, req);

  Users = (body: API.User.GetsBody, req: NextApiRequest): Promise<User[]> =>
    this.PostQuery("User/gets", body, req);
  //#endregion

  //#region Chat
  Chat = (body: API.Chat.GetBody, req: NextApiRequest): Promise<Chat> =>
    this.PostQuery("Chat", body, req);

  Chats = (body: API.Chat.GetsBody, req: NextApiRequest): Promise<Chat[]> =>
    this.PostQuery("Chat/gets", body, req);

  FindChat = (body: API.Chat.FindBody, req: NextApiRequest): Promise<Chat[]> =>
    this.PostQuery("Chat/find", body, req);

  Messages = (
    body: API.Message.GetsBody,
    req?: NextApiRequest
  ): Promise<Messages> => this.PostQuery("Message/gets", body, req);

  FindMessage = (
    body: API.Message.FindBody,
    req: NextApiRequest
  ): Promise<Chat[]> => this.PostQuery("Message/find", body, req);
  //#endregion
  //#endregion

  //#region Mutation
  InviteChat = (
    body: API.Chat.InviteBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/invite", body, req);
  LeaveChat = (
    body: API.Chat.LeaveBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/leave", body, req);
  CreateChat = (
    body: API.Chat.CreateBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/create", body, req);
  RemoveChat = (
    body: API.Chat.RemoveBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/remove", body, req);

  SendMessage = (
    body: API.Message.SendBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/send", body, req);

  ChangeMessage = (
    body: API.Message.ChangeBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/change", body, req);

  RemoveMessage = (
    body: API.Message.RemoveBody,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/remove", body, req);
  //#endregion
}
