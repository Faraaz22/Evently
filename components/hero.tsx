import React from 'react'
import { Button } from './ui/button'

export function Hero() {
  return (
    <div><section className="mb-10">
          <h1 className="text-pretty text-3xl font-bold sm:text-4xl">Discover and book events with Evently</h1>
          <p className="mt-2 max-w-prose text-gray-600 dark:text-gray-400">
            Modern, accessible UI components built with Tailwind CSS v3.4 and Next.js 15.
          </p>
          <div className="mt-4">
            <Button variant="link">Open booking modal</Button>
          </div>
        </section></div>
  )
}

