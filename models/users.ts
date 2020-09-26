import { User } from "@types";
import { model, Schema, models, Types } from "mongoose";

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
  chats_id: { type: [{ type: Types.ObjectId }] },
});

export default models.users ?? model("users", usersSchema);
