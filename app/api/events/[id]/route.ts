import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Extract id from the request URL
    const { pathname } = req.nextUrl;
    // pathname will be like "/api/events/123", so extract the id
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing event id" }, { status: 400 });
    }

    const event = await Event.findById(id);

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

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing event id" }, { status: 400 });
    }

    const data = await req.json();

    const updated = await Event.findByIdAndUpdate(id, data, { new: true });

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

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing event id" }, { status: 400 });
    }

    await Event.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
