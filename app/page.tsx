"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { EventCard } from "@/components/event-card";
import { useAppSelector, useAppDispatch } from "@/store/hooks"; 
import { fetchEvents } from "@/store/eventSlice";
import { fetchMyTickets } from "@/store/ticketSlice";
import { useEffect } from "react";
import  Image  from "next/image";
import Cta from "@/components/ctasection";
import { Whysection } from "@/components/whysection";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.event);
  const { tickets, loading: ticketsLoading, error: ticketsError } = useAppSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(fetchEvents());
    if (user) {
      dispatch(fetchMyTickets());
    }
  }, [dispatch, user]);

  const featuredEvents = events.slice(0, 6);

  return (
    <main>
      {/* My Tickets Section (only if logged in) */}
      {user && (
  <section className="mb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-xl font-semibold sm:text-2xl mb-5 text-gray-900 dark:text-white">
      My Tickets
    </h2>

    {ticketsLoading ? (
      <p className="text-gray-600 dark:text-gray-400">Loading your tickets...</p>
    ) : ticketsError ? (
      <p className="text-red-500">{ticketsError}</p>
    ) : tickets.length === 0 ? (
      <p className="text-gray-700 dark:text-gray-300">You have not booked any tickets yet.</p>
    ) : (
      <ul className="space-y-4">
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {typeof ticket.eventId === "object" && "title" in ticket.eventId
    ? ticket.eventId.title
    : "Unknown Event"}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Booked on: {new Date(ticket.bookedAt).toLocaleDateString()}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-gray-700 dark:text-gray-300">
              <span>
                <strong>Quantity:</strong> {ticket.quantity}
              </span>
              <span>
                <strong>Price:</strong> ${ticket.price.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
)}

      <section className="relative w-full min-h-screen overflow-hidden">
       
    <Image
      src="/energetic-concert-crowd.png"
      alt="Party background"
      fill
      className="object-cover z-0 brightness-[1.2] dark:brightness-[0.8] blur-sm opacity-30"
      priority
    />
  
        {user && (
  <div className="absolute right-4 top-4 z-50 hidden sm:block">
  <Button variant="outline" asChild>
    <Link href="/events/create">Create Your Own Event</Link>
  </Button>
</div>
)}

<div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
  <div>
    <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
      Discover. Book. Experience.
    </h1>

    <p className="mt-3 text-base text-zinc-300 md:text-lg">
      Evently makes it simple to find the events you love and secure your tickets in seconds.
    </p>

    <div className="mt-6 flex flex-wrap items-center gap-3">
    <Button variant="outline" asChild><Link href="/events">Browse Events</Link></Button>

      {!user && (
        <Button className="bg-pink-600 hover:bg-pink-700 text-white" asChild>
  <Link href="/register">Sign up</Link>
</Button>

      )}
    </div>

    <p className="mt-3 text-xs text-zinc-400">
      Curated categories, instant checkout, and reminders so you never miss out.
    </p>
  </div>

  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
    <Image
      src="/concert-crowd-lights.png"
      alt="Event crowd"
      fill
      className="object-cover"
      priority
    />
  </div>
</div>
      </section>

<section className="relative w-full min-h-screen overflow-hidden"> 

    <Image
      src="/vibrant-dance-party.png"
      alt="Party background"
      fill
      className="object-cover z-0 brightness-[1.2] dark:brightness-[0.8] blur-sm opacity-30"
      priority
    />

      {/* Why Evently Section */}
  <Whysection/>


      {/* Featured Events Section */}
      <Reveal
  as="section"
  aria-labelledby="events-heading"
  className="py-16 px-4 sm:px-6 lg:px-8 mb-16"
  delayMs={50}
>
  <div className="flex items-center justify-between mb-8">
    <h2
      id="events-heading"
      className="text-2xl sm:text-3xl font-bold text-white"
    >
      Featured events
    </h2>

    <Link
      href="/events"
      className="text-sm font-medium text-pink-500 underline-offset-4 hover:underline"
    >
      See all
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {featuredEvents.map((event) => (
      <EventCard
        key={event._id}
        id={event._id}
        title={event.title}
        date={new Date(event.date).toLocaleDateString()}
        price={`$${event.price}`}
        image={event.image}
      />
    ))}
  </div>
</Reveal>


      {/* CTA Section */}
      {!user && (
  <Cta/>
)}
      </section>
    </main>
  );
}


