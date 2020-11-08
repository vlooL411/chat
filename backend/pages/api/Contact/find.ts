import DataApi from 'base/DataApi'
import users from 'models/users'
import { Types } from 'mongoose'
import { Contact, Contacts, QueryFindContactArgs, User } from '@generated/backend'
import { NextApiRequest, NextApiResponse } from 'next'
import { ID } from '@chat/apollocommon'

import { AggregateFilter, AggregateLookUp, ContactProject } from './common'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const dataApi = new DataApi(req, res);
  switch (method) {
    case "POST":
      try {
        const { text } = body as QueryFindContactArgs;
        const userid = await dataApi.WrongTrustUserID(!text, "Enter text");
        if (!userid) return;

        const Existing: Contact[] = await AggregateLookUp(userid)
          .match({
            $or: [
              { "contacts.User.name": { $regex: text, $options: "i" } },
              { "contacts.whoIsContact": { $regex: text, $options: "i" } },
            ],
          })
          .replaceRoot("$contacts")
          .unwind("$User")
          .project(ContactProject);

        const contactUserID: ID[] = (
          await AggregateFilter(userid).group({
            _id: "$contacts.userid",
          })
        ).map((user: User) => user._id);

        contactUserID.push(new Types.ObjectId(userid) as any);
        const Incoming: Contact[] = await users
          .aggregate()
          .match({
            _id: { $nin: contactUserID },
            name: { $regex: text, $options: "i" },
            $or: [{ isClosed: false }, { isClosed: null }],
          })
          .addFields({
            userid: "$_id",
            date: "Don't exist",
            User: {
              _id: "$_id",
              name: "$name",
              image: "$image",
              status: "$status",
              dateLastOnline: "$dateLastOnline",
            },
          })
          .project(ContactProject);

        dataApi.True<Contacts>({ Existing, Incoming } ?? "Contacts are empty");
      } catch (error) {
        dataApi.Error(error, "Error request find contacts");
      }
      break;
    default:
      dataApi.Default();
  }
};
