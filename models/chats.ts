import { Chat } from "apolloclient/types";
import { model, Schema, models, Types } from "mongoose";

const MessageSchema = {
  _id: { type: Types.ObjectId },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  userid: { type: String, required: true },
  isChange: { type: Boolean },
};

const chatsSchema = new Schema<Chat>({
  title: { type: String, required: true },
  image: { type: String },
  date: { type: Date, required: true },
  creater: { type: String, required: true },
  creater_id: { type: Types.ObjectId, required: true }, //type User
  access: { type: String, required: true },
  users_id: { type: [{ type: Types.ObjectId }] },
  messages: { type: [MessageSchema] },
});

export default models.chats ?? model("chats", chatsSchema);
