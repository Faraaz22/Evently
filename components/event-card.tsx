

"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { bookTicket } from "@/store/ticketSlice"
import { useState } from "react"
import { Input } from "@/components/ui/input"

type EventCardProps = {
  id: string
  image?: string
  title: string
  date: string
  price: string
}

export function EventCard({ id, image, title, date, price }: EventCardProps) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)
  const { tickets } = useAppSelector((state) => state.ticket)

const bookedTicket = tickets.find((t) => {
  if (typeof t.eventId === "string") return t.eventId === id;
  if (typeof t.eventId === "object" && "_id" in t.eventId) return t.eventId._id === id;
  return false;
});

  const bookedQty = bookedTicket ? bookedTicket.quantity : 0
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    if (quantity > 0) {
      dispatch(bookTicket({ eventId: id, quantity }))
      setBooked(true)
      setTimeout(() => setBooked(false), 2000)
    }
  }

  return (
    <Card className="overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      {/* Card Content */}
      <CardContent className="space-y-2 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-300">{date}</p>
        <p className="text-lg font-bold text-white">{price}</p>

        {/* Quantity input */}
        <div className="flex items-center gap-2 mt-3">
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 bg-white/10 text-white border-white/20"
            disabled={booked}
          />
          <span className="text-xs text-zinc-400">Qty</span>
          {bookedTicket && (
            <span className="ml-2 px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">
              Booked: {bookedQty}
            </span>
          )}
        </div>
      </CardContent>

      {/* Book Button */}
      <CardFooter className="p-4 pt-0 sm:p-6">
        <Button
          className="w-full"
          onClick={handleBook}
          disabled={booked}
          variant={booked ? "outline" : "default"}
        >
          {booked ? "Booked!" : "Book Ticket"}
        </Button>
      </CardFooter>
    </Card>
  )
}
