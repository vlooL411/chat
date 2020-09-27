import { API } from "..";
import { Chat } from "@types";
import chats from "models/chats";
import DataApi from "base/DataApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid } = body as API.Chat.RemoveBody;
        const userid = await dataApi.WrongTrustUserID(!chatid, "Enter chatid");
        if (!userid) return;

        const { deletedCount } = await chats.deleteOne({
          _id: chatid,
          creaters_id: { $elemMatch: { $eq: userid } },
        });

        dataApi.True<Chat>(
          deletedCount > 0 ? ({ _id: chatid } as any) : "Chat don't remove"
        );
      } catch (error) {
        dataApi.Error(error, "Error request remove chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
