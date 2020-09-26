import chats from "models/chats";
import users from "models/users";
import DataApi from "base/DataApi";
import { Chat, User } from "@types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const { chats_id }: User = await users.findOne(
          { _id: userid },
          "chats_id"
        );
        
        const chat_s: Chat[] = await chats.aggregate([
          { $match: { _id: { $in: chats_id } } },
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

        dataApi.True<Chat[]>(chat_s ?? "Chats empty");
      } catch (error) {
        dataApi.Error(error, "Error request chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
