import DataApi from 'base/DataApi'
import chats from 'models/chats'
import users from 'models/users'
import { Types } from 'mongoose'
import { Access, Chat, Contact, Creater } from '@backend'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { title, contactid } = body as any;

        const userid = await dataApi.WrongTrustUserID(
          !title || !contactid,
          "Enter title and contactid"
        );
        if (!userid) return;

        const chatTitleExist = await chats.findOne({ title });
        if (chatTitleExist) {
          dataApi.True("Such a title exists");
          return;
        }

        const chat: Chat = {
          _id: new Types.ObjectId() as any,
          title,
          date: new Date(),
          creaters_id: [userid, contactid],
          creater: Creater.Contact,
          access: Access.Private,
        };

        const contact: Contact = {
          _id: chat._id,
          date: chat.date,
          userid,
          whoIsContact: title,
        };

        const chat_s: Chat[] = await chats.insertMany([chat]);

        const { ok } = await users.updateOne(
          { _id: { $or: [userid, contactid] } },
          { $push: { chats_id: chat?._id, contacts: contact } as never }
        );

        dataApi.True<Contact>(
          ok != 0
            ? contact ?? "Contact don't create"
            : "Contact don't push to user contacts"
        );
      } catch (error) {
        dataApi.Error(error, "Error request create contact");
      }
      break;
    default:
      dataApi.Default();
  }
};
