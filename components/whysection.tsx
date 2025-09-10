"use client";

import { Reveal } from "./reveal";

export function Whysection() {
  return (
<Reveal
  as="section"
  className="py-16 px-4 sm:px-6 lg:px-8 mb-16"
  delayMs={50}>  
  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-12 text-center">
    Why Evently?
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <Reveal delayMs={100}>
      <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-white mb-2">Curated for you</h3>
        <p className="text-sm text-zinc-300">
          Hand-picked events by interest and location.
        </p>
      </div>
    </Reveal>

    <Reveal delayMs={150}>
      <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-white mb-2">Instant checkout</h3>
        <p className="text-sm text-zinc-300">
          Secure payments and seamless ticket delivery.
        </p>
      </div>
    </Reveal>

    <Reveal delayMs={200}>
      <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-white mb-2">Never miss out</h3>
        <p className="text-sm text-zinc-300">
          Smart reminders and calendar sync built-in.
        </p>
      </div>
    </Reveal>
  </div>
</Reveal> 
  );
}
