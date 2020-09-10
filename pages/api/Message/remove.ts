import chats from "../../../models/chats";
import DataApi from "../../../base/api/DataApi";
import { NextApiRequest, NextApiResponse } from "next";
import { ID, Message } from "./../../../apolloclient/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, messageid } = body as { chatid: ID; messageid: ID };

        const condition = !chatid || !messageid;
        if (dataApi.Wrong(condition, "Enter chatid or messageid")) return;

        const { ok } = await chats.updateOne(
          { _id: chatid },
          {
            $pull: {
              messages: { _id: messageid } as never,
            },
          },
          { multi: true }
        );
        dataApi.True<string>(
          ok != 0 ? "Message remove" : "Message don't remove"
        );
      } catch (error) {
        dataApi.Error(error, "Error request message change");
      }
      break;
    default:
      dataApi.Default();
  }
};
