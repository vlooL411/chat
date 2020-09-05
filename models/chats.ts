import { Chat } from "./../apolloclient/types";
import { model, Schema, models, Types } from "mongoose";

var chatsSchema = new Schema<Chat>({
  creater_id: { type: Types.ObjectId, required: true }, //type User
  creater: { type: String },
  date: { type: Date, required: true },
  title: { type: String },
  image: { type: String },
  users_id: {
    type: [{ type: Types.ObjectId }],
  },
  messages: {
    type: [
      {
        _id: { type: Types.ObjectId },
        text: { type: String, required: true },
        date: { type: Date, required: true },
        userid: { type: String, required: true },
        isChange: { type: Boolean },
      },
    ],
  },
  lastMessage: { type: Number },
  isNotifications: { type: Boolean },
});

export default models.chats ?? model("chats", chatsSchema);
