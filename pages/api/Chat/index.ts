import { Types } from "mongoose";
import { Chat, ID } from "./../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";
import DataApi from "../../../base/api/DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { id: chatid } = body as { id: ID };
        if (dataApi.Wrong(!chatid, "Data wrong: Enter id for chat")) return;

        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const chat: Chat = await chats.findOne(
          {
            _id: chatid,
            $or: [
              { creater_id: userid },
              {
                users_id: { $elemMatch: { userid } },
              },
            ],
          },
          "_id creater_id creater date title messages"
        );

        dataApi.True<Chat>(chat ?? "Chat don't exist or access");
      } catch (error) {
        dataApi.Error(error, "Error request chat");
      }
      break;
    default:
      dataApi.Default();
  }
};
