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
        const { contactid } = body as API.Contact.GetBody;

        const userid = await dataApi.TrustUserID();
        if (!userid) return;

        const contacts: Contact[] = await users
          .aggregate()
          .match({ _id: new Types.ObjectId(userid) })
          .project({
            _id: false,
            contacts: {
              $filter: {
                input: "$contacts",
                as: "contact",
                cond: { "$$contact._id": contactid },
              },
            },
          })
          .unwind("$contacts")
          .lookup({
            from: "users",
            localField: "contacts.userid",
            foreignField: "_id",
            as: "contacts.user",
          })
          .replaceRoot("$contacts")
          .project({
            userid: true,
            date: true,
            whoIsContact: true,
            name: { $arrayElemAt: ["$user.name", 0] },
            image: { $arrayElemAt: ["$user.image", 0] },
            status: { $arrayElemAt: ["$user.status", 0] },
          });

        console.log(contacts);

        dataApi.True<Contact[]>(contacts ?? "Contacts are empty");
      } catch (error) {
        dataApi.Error(error, "Error request get contacts");
      }
      break;
    default:
      dataApi.Default();
  }
};
