import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Ticket from "@/models/ticket";
import Event from "@/models/Events";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1. Verify JWT from Authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // 2. Get request body
    const { eventId, quantity } = await req.json();

    const event = await Event.findById(eventId);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // 3. Create ticket
    const ticket = await Ticket.create({
      userId: decoded.id,
      eventId,
      quantity,
      price: event.price * quantity,
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
