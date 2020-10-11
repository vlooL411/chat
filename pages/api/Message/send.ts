import DataApi from 'base/DataApi'
import chats from 'models/chats'
import { Access, Message, MutationSendMessageArgs } from '@backend'
import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { chatid, text } = body as MutationSendMessageArgs;

        const userid = await dataApi.WrongTrustUserID(
          !chatid || !text,
          "Enter chatid or text"
        );
        if (!userid) return;

        const message: Message = {
          _id: new Types.ObjectId() as any,
          text,
          date: new Date(),
          userid,
        };

        const { ok } = await chats.updateOne(
          {
            _id: chatid,
            $or: [
              { access: Access.Public },
              { creaters_id: { $elemMatch: { $eq: userid } } },
              { users_id: { $elemMatch: { $eq: userid } } },
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
