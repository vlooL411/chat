import { model, Schema, models, Types } from "mongoose";

var sessionsSchema = new Schema<Account>({
  userId: { type: Types.ObjectId, required: true },
  expires: { type: Date },
  sessinToken: { type: String },
  accessToken: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export default models.sessions ?? model("sessions", sessionsSchema);
