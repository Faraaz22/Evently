
"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchEvents } from "@/store/eventSlice"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image" 

export default function EventsPage() {
  const dispatch = useAppDispatch()
  const { events, loading, error } = useAppSelector((state) => state.event)

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  if (loading) return <p className="text-center mt-10">Loading events...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  // Filter events by search term (case-insensitive match)
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
  {/* Background image */}
  <Image
    src="/orchestra.jpg"
    alt="Party background"
    fill
    className="object-cover z-0 brightness-[1.2] dark:brightness-[0.8] blur-sm opacity-60"
    priority
  />

  {/* Page content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold sm:text-3xl">All Events</h1>
        <p className="text-sm text-muted-foreground">
          Browse concerts, clubs, theatre, and more.
        </p>
      </div>
      <div className="flex w-full items-center gap-3 sm:w-auto">
        <Input
          placeholder="Search events..."
          className="w-full sm:w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setSearchTerm("")} variant="outline">Clear</Button>
      </div>
    </header>

    {/* Events grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            date={new Date(event.date).toLocaleDateString()}
            price={`$${event.price}`}
            image={event.image}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-muted-foreground">No events found.</p>
      )}
    </div>
  </div>
</section>


  )
}
