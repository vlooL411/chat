import { API } from "..";
import chats from "models/chats";
import DataApi from "base/DataApi";
import { Access, Chat } from "@types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid } = body as API.Chat.GetBody;

        const userid = await dataApi.WrongTrustUserID(!chatid, "Enter chatid");
        if (!userid) return;

        let chat: Chat = await chats.findOne(
          {
            _id: chatid,
            $or: [
              { access: Access.Public },
              { creaters_id: { $elemMatch: { $eq: userid } } },
              { users_id: { $elemMatch: { $eq: userid } } },
            ],
          },
          "_id title image date creater creaters_id access"
        );

        /* if (chat) {
          switch (chat?.access) {
            case Access.Private:
              chat = null;
              break;
          }
        } */

        dataApi.True<Chat>(chat ?? "Chat don't exist or access");
      } catch (error) {
        dataApi.Error(error, "Error request chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
