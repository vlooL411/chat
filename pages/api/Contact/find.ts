import DataApi from 'base/DataApi'
import users from 'models/users'
import { Types } from 'mongoose'
import { Contact } from '@types'
import { NextApiRequest, NextApiResponse } from 'next'

import { API } from '..'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { text } = body as API.Contact.FindBody;
        const userid = await dataApi.WrongTrustUserID(!text, "Enter text");
        if (!userid) return;

        const contacts: Contact[] = await users
          .aggregate()
          .match({ _id: new Types.ObjectId(userid) })
          .project({ _id: false, contacts: true })
          .unwind("$contacts")
          .lookup({
            from: "users",
            localField: "contacts.userid",
            foreignField: "_id",
            as: "contacts.user",
          })
          .replaceRoot("$contacts")
          .match({
            $or: [
              { "user.name": { $regex: text, $options: "i" } },
              { whoIsContact: { $regex: text, $options: "i" } },
            ],
          })
          .project({
            userid: true,
            date: true,
            whoIsContact: true,
            name: { $arrayElemAt: ["$user.name", 0] },
            image: { $arrayElemAt: ["$user.image", 0] },
            status: { $arrayElemAt: ["$user.status", 0] },
          });

        dataApi.True(contacts ?? "Contacts are empty");
      } catch (error) {
        dataApi.Error(error, "Error request find contacts");
      }
      break;
    default:
      dataApi.Default();
  }
};
