import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Incoming POST body:", body);

    const event = await Event.create(body);

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error(" Event creation error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create event";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server"
// import {connectDB} from "@/lib/db"
// import Event from "@/models/Events"


// export async function GET() {
//   try {
//     await connectDB()
//     const events = await Event.find().sort({ createdAt: -1 })
//     return NextResponse.json({ events })
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB()

//     const body = await req.json()
//     console.log("📦 Incoming POST body:", body)

//     const event = await Event.create(body)

//     return NextResponse.json({ event }, { status: 201 })
//   } catch (error: any) {
//     console.error("❌ Event creation error:", error)
//     return NextResponse.json(
//       { error: error.message || "Failed to create event" },
//       { status: 500 }
//     )
//   }
// }


