import { Contact, User } from "@types";
import { Collection } from "./collections";
import { model, Schema, models, Types } from "mongoose";

const contact = new Schema<Contact>({
  _id: { type: Types.ObjectId, required: true },
  userid: { type: Types.ObjectId, required: true, ref: Collection.users },
  date: { type: Date, required: true },
  whoIsContact: { type: String },
});

const usersSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  status: { type: String },
  isOnline: { type: Boolean },
  isOnlineMobile: { type: Boolean },
  dateLastOnline: { type: String },
  notifications: { type: Array },
  chats_id: { type: [{ type: Types.ObjectId, ref: Collection.chats }] },
  contacts: [contact],
});

export default models.users ?? model(Collection.users, usersSchema);
