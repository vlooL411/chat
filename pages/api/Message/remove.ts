import { API } from "..";
import chats from "../../../models/chats";
import DataApi from "../../../base/DataApi";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, messageid } = body as API.Message.RemoveBody;

        const userid = await dataApi.WrongTrustUserID(
          !chatid || !messageid,
          "Enter chatid or messageid"
        );
        if (!userid) return;

        const { ok } = await chats.updateOne(
          {
            _id: chatid,
            $or: [
              { creater_id: userid },
              { messages: { $elemMatch: { _id: messageid, userid } } },
            ],
          },
          { $pull: { messages: { _id: messageid } as never } },
          { multi: true }
        );
        dataApi.True<string>(ok != 0 ? null : "Message don't remove");
      } catch (error) {
        dataApi.Error(error, "Error request message remove");
      }
      break;
    default:
      dataApi.Default();
  }
};
