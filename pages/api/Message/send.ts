import { Access } from "apolloclient/types";
import { API } from "./../index";
import { Types } from "mongoose";
import chats from "../../../models/chats";
import DataApi from "../../../base/DataApi";
import { Message } from "./../../../apolloclient/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, text } = body as API.Message.SendBody;

        const userid = await dataApi.WrongTrustUserID(
          !chatid || !text,
          "Enter chatid or text"
        );
        if (!userid) return;

        const message: Message = {
          _id: new Types.ObjectId(),
          text,
          date: new Date(),
          userid,
        };

        const { ok } = await chats.updateOne(
          {
            _id: chatid,
            $or: [
              { access: Access.Public },
              { creater_id: userid },
              { users_id: userid },
            ],
          },
          { $push: { messages: message as never } }
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
