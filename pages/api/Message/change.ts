import chats from "../../../models/chats";
import DataApi from "../../../base/api/DataApi";
import { NextApiRequest, NextApiResponse } from "next";
import { ID, Message } from "../../../apolloclient/types";

type BodyType = { chatid: ID; text: string; messageid: ID };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, text, messageid } = body as BodyType;

        const condition = !chatid || !text || !messageid;
        if (dataApi.Wrong(condition, "Enter chatid or text")) return;

        const message = {
          _id: messageid,
          text,
          isChange: true,
        } as Message;

        const { ok } = await chats.updateOne(
          { _id: chatid, messages: { $elemMatch: { _id: messageid } } },
          {
            $set: {
              "messages.$.text": text,
              "messages.$.isChange": true,
            },
          }
        );

        dataApi.True<Message>(ok != 0 ? message : "Message don't change");
      } catch (error) {
        dataApi.Error(error, "Error request message change");
      }
      break;
    default:
      dataApi.Default();
  }
};
