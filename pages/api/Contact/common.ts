import users from 'models/users'
import { ID } from '@types'
import { Types } from 'mongoose'

export const AggregateFilter = (_id: ID) =>
  users
    .aggregate()
    .match({ _id: new Types.ObjectId(_id) })
    .project({ _id: false, contacts: true })
    .unwind("$contacts");

export const ContactLookUp = {
  from: "users",
  localField: "contacts.userid",
  foreignField: "_id",
  as: "contacts.User",
};

export const AggregateLookUp = (_id: ID) =>
  AggregateFilter(_id).lookup(ContactLookUp);

export const ContactProject = {
  userid: true,
  date: true,
  whoIsContact: true,
  User: {
    _id: true,
    name: true,
    image: true,
    status: true,
    dateLastOnline: true,
  },
};
