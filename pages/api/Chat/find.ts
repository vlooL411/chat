import { API } from "..";
import chats from "models/chats";
import DataApi from "base/DataApi";
import { Chat, Access, Creater } from "apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { title } = body as API.Chat.FindBody;
        const userid = await dataApi.WrongTrustUserID(!title, "Enter title");
        if (!userid) return;

        const chat_s: Chat[] = await chats.find(
          {
            title: { $regex: title, $options: "i" },
            $or: [{ creater: { $ne: Creater.User } }, { creater_id: userid }],
            access: { $nin: [Access.Private, Access.Own] },
          },
          { messages: { $slice: -1 }, users_id: false }
        );

        dataApi.True<Chat[]>(chat_s ?? "Find empty");
      } catch (error) {
        dataApi.Error(error, "Error request chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
