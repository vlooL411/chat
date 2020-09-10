import { Message } from "./../../../apolloclient/types";
import { ID } from "../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";
import { Types } from "mongoose";
import DataApi from "../../../base/api/DataApi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, text } = body as { chatid: ID; text: string };
        if (dataApi.Wrong(!chatid || !text, "Data wrong: Enter chatid or text"))
          return;

        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const message: Message = {
          _id: new Types.ObjectId(),
          text,
          date: new Date(),
          userid,
          isChange: false,
        };

        const { ok } = await chats.updateOne(
          { _id: chatid },
          {
            $push: {
              messages: message as never,
            },
          }
        );

        dataApi.True<Message>(ok != 0 ? message : "Message don't send");
      } catch (error) {
        dataApi.Error(error, "Error request message send");
      }
      break;
    default:
      dataApi.Default();
  }
};
