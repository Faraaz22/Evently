import { Reveal } from './reveal'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Cta(){
  return (
    <div>
    <Reveal
    as="section"
    className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-md hover:shadow-lg transition mb-12"
    delayMs={50}
  >
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          Ready for your next experience?
        </h3>
        <p className="text-sm text-zinc-300 mt-1">
          Create an account to follow organizers and get personalized picks.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/register">Get started</Link>
        </Button>
        <Button variant="outline" asChild className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  </Reveal></div>
  )
}
