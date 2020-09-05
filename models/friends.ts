import { model, Schema, models } from "mongoose";
import { Friend } from "../apolloclient/types";

var friendsSchema = new Schema<Friend[]>({
  user_id: { type: Number, required: true }, //type User
  friends: { type: Array },
});

export default models.friends ?? model("friends", friendsSchema);
