
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createEvent } from "@/store/eventSlice"

export default function CreateEventPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")

  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.event)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await dispatch(
      createEvent({ title, description, date, location, price, image })
    ).unwrap() 

    router.push("/events") 
  }

  useEffect(() => {
    if (!loading && !error) {
    }
  }, [loading, error])

  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <Label>Location</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <Label>Price</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </main>
  )
}
