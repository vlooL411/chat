import { Chat, ID } from "../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";
import chats from "../../../models/chats";
import DataApi from "../DataApi";

type BodyType = { chatid: ID; text: string; messageid: ID };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, text, messageid } = body as BodyType;

        const condition = !chatid || !text || !messageid;
        if (dataApi.Wrong(condition, "Data wrong: Enter chatid or text"))
          return;

        const changeMessage: Chat = await chats.updateOne(
          { _id: chatid, messages: { $elemMatch: { _id: messageid } } },
          {
            $set: {
              "messages.$.text": text,
              "messages.$.isChange": true,
            },
          }
        );

        dataApi.True<string>(
          changeMessage ? "Message change" : "Message don't change"
        );
      } catch (error) {
        dataApi.Error(error, "Error request message change");
      }
      break;
    default:
      dataApi.Default();
  }
};
