import { Friend } from "../apolloclient/types";
import { model, Schema, models } from "mongoose";

var friendSchema = new Schema<Friend>({
  id: { type: Number, required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true },
  whoIsFriend: { type: String },
});

export default models.friend ?? model("friend", friendSchema);
