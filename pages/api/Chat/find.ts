import DataApi from 'base/DataApi'
import chats from 'models/chats'
import { Access, Chat, Creater, QueryFindChatArgs } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { title } = body as QueryFindChatArgs;
        const userid = await dataApi.WrongTrustUserID(!title, "Enter title");
        if (!userid) return;

        const chat_s: Chat[] = await chats
          .aggregate()
          .match({
            title: { $regex: title, $options: "i" },
            $or: [
              { creater: { $ne: Creater.Contact } },
              { creaters_id: { $elemMatch: { $eq: userid } } },
            ],
            access: { $nin: [Access.Private, Access.Own] },
          })
          .project({
            _id: true,
            date: true,
            title: true,
            creater: true,
            creaters_id: true,
            access: true,
            lastMessage: { $arrayElemAt: ["$messages", -1] },
          });

        dataApi.True<Chat[]>(chat_s ?? "Chats don't finded");
      } catch (error) {
        dataApi.Error(error, "Error request find chats");
      }
      break;
    default:
      dataApi.Default();
  }
};
