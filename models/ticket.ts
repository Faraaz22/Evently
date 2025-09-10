import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Events", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Tickets || model("Tickets", TicketSchema);
