// frontend/models/User.ts
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["attendee", "organizer"], default: "attendee" },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
