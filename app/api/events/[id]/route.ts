import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

// GET /api/events/[id]
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const event = await Event.findById(context.params.id);

    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("❌ GET error:", error);

    const message = error instanceof Error ? error.message : "Failed to fetch event";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/events/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const data = await req.json();

    const updated = await Event.findByIdAndUpdate(context.params.id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ event: updated });
  } catch (error) {
    console.error("❌ PUT error:", error);

    const message = error instanceof Error ? error.message : "Failed to update event";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    await Event.findByIdAndDelete(context.params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE error:", error);

    const message = error instanceof Error ? error.message : "Failed to delete event";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
