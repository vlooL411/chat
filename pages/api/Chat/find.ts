import { API } from "..";
import chats from "models/chats";
import DataApi from "base/DataApi";
import { Chat, Access, Creater } from "@types";
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

        const chat_s: Chat[] = await chats.aggregate([
          {
            $match: {
              title: { $regex: title, $options: "i" },
              $or: [{ creater: { $ne: Creater.User } }, { creater_id: userid }],
              access: { $nin: [Access.Private, Access.Own] },
            },
          },
          {
            $project: {
              _id: true,
              date: true,
              title: true,
              creater: true,
              creater_id: true,
              access: true,
              lastMessage: { $arrayElemAt: ["$messages", -1] },
            },
          },
        ]);

        dataApi.True<Chat[]>(chat_s ?? "Find empty chats");
      } catch (error) {
        dataApi.Error(error, "Error request chats");
      }
      break;
    default:
      dataApi.Default();
  }
};
