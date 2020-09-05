import { NextApiRequest } from "next";
import { ID, Friend, IMessangerAsync } from "./../apolloclient/types";
import { Chat, User } from "../apolloclient/types";

const { HOST_API } = process.env;

export default class MessangerMongoDB implements IMessangerAsync {
  async PostQuery(
    relativeUrl: string,
    body,
    req: NextApiRequest
  ): Promise<any> {
    const data = await fetch(`${HOST_API}/${relativeUrl}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { ...req?.headers } as any,
    });

    return data.json().then((el) => el?.data);
  }

  //#region Query
  User = (id: ID, req: NextApiRequest): Promise<User> =>
    this.PostQuery("User", { id }, req);

  UserID = async (
    name?: string,
    email?: string,
    req?: NextApiRequest
  ): Promise<User> => await this.PostQuery("User/id", { name, email }, req);

  Users = (start: number, end: number, req: NextApiRequest): Promise<User[]> =>
    this.PostQuery("User/gets", { start, end }, req);

  Chat = (id: ID, req: NextApiRequest): Promise<Chat> =>
    this.PostQuery("Chat", { id }, req);

  Chats = (start: number, end: number, req: NextApiRequest): Promise<Chat[]> =>
    this.PostQuery("Chat/gets", { start, end }, req);

  Friends = (id: ID, req: NextApiRequest): Promise<Friend[]> =>
    this.PostQuery("Friend/gets", { id }, req);
  //#endregion

  //#region Mutation
  SendMessage = (
    chatid: ID,
    text: string,
    req: NextApiRequest
  ): Promise<string> =>
    this.PostQuery(
      "Message/send",
      {
        chatid,
        text,
      },
      req
    );

  ChangeMessage = (
    chatid: ID,
    messageid: ID,
    text: string,
    req: NextApiRequest
  ): Promise<string> =>
    this.PostQuery(
      "Message/change",
      {
        chatid,
        messageid,
        text,
      },
      req
    );

  RemoveMessage = (
    chatid: ID,
    messageid: ID,
    req: NextApiRequest
  ): Promise<string> =>
    this.PostQuery(
      "Message/remove",
      {
        chatid,
        messageid,
      },
      req
    );
  //#endregion

  //#region Subscription
  AddMessage = (
    chatid: ID,
    lastmessageid?: ID,
    req?: NextApiRequest
  ): Promise<string> =>
    this.PostQuery(
      "Chat/Message/add",
      {
        chatid,
        lastmessageid,
      },
      req
    );
  //#endregion
}
