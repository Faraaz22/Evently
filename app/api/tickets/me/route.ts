import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Ticket from "@/models/ticket";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 1. Verify JWT
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // 2. Fetch tickets for user
    const tickets = await Ticket.find({ userId: decoded.id }).populate("eventId");

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error("Fetch tickets error:", error);

    const message = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import {connectDB} from "@/lib/db";
// import Ticket from "@/models/ticket";

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     // 1. Verify JWT
//     const token = req.headers.get("authorization")?.split(" ")[1];
//     if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

//     // 2. Fetch tickets for user
//     const tickets = await Ticket.find({ userId: decoded.id }).populate("eventId");

//     return NextResponse.json({ tickets });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
