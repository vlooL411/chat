import { Chat, User } from "./../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";
import DataApi from "../DataApi";
import users from "../../../models/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const userChats: User = await users.findOne(
          { _id: userid },
          "chats_id"
        );

        const { chats_id } = userChats;

        const chat_s: Chat[] = await chats.find(
          { _id: { $in: chats_id } },
          "_id creater_id creater date title"
        );

        dataApi.True<Chat[]>(chat_s ?? "Chats empty");
      } catch (error) {
        dataApi.Error(error, "Error request chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
