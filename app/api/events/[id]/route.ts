import { NextResponse } from "next/server"
import {connectDB} from "@/lib/db"
import Event from "@/models/Events"

type Params = { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  try {
    await connectDB()
    const event = await Event.findById(params.id)
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ event })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB()
    const data = await req.json()
    const updated = await Event.findByIdAndUpdate(params.id, data, { new: true })
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ event: updated })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await connectDB()
    await Event.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
