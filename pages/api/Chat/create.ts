import { API } from "..";
import { Types } from "mongoose";
import users from "models/users";
import chats from "models/chats";
import DataApi from "base/DataApi";
import { Access, Chat, Creater } from "@types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { title } = body as API.Chat.CreateBody;
        const userid = await dataApi.WrongTrustUserID(!title, "Enter title");
        if (!userid) return;

        const chatTitleExist = await chats.findOne({ title });
        if (chatTitleExist) {
          dataApi.True("Such a title exists");
          return;
        }

        const chat: Chat = {
          _id: new Types.ObjectId(),
          title,
          date: new Date(),
          creaters_id: [userid],
          creater: Creater.Chat,
          access: Access.Public,
        };

        const chat_s: Chat[] = await chats.insertMany([chat]);

        const chatPop = chat_s?.pop();

        const { ok } = await users.updateOne(
          { _id: userid },
          {
            $push: {
              chats_id: chat._id as never,
            },
          }
        );

        dataApi.True<Chat>(
          ok != 0
            ? chatPop ?? "Chat don't create"
            : "Chat don't push to user chats"
        );
      } catch (error) {
        dataApi.Error(error, "Error request insert chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
