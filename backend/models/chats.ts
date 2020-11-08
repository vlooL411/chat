import { Chat } from '@generated/backend'
import { model, models, Schema, Types } from 'mongoose'

import { Collection } from './collections'

const MessageSchema = {
  _id: { type: Types.ObjectId },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  userid: { type: Types.ObjectId, required: true, ref: Collection.users },
  isChange: { type: Boolean },
};

const chatsSchema = new Schema<Chat>({
  title: { type: String, required: true },
  image: { type: String },
  date: { type: Date, required: true },
  creater: { type: String, required: true },
  creaters_id: {
    type: [{ type: Types.ObjectId, required: true, ref: Collection.users }],
  },
  access: { type: String, required: true },
  users_id: { type: [{ type: Types.ObjectId, ref: Collection.users }] },
  messages: { type: [MessageSchema] },
});

export default models.chats ?? model(Collection.chats, chatsSchema);
