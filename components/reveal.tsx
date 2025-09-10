"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  delayMs?: number
}

export function Reveal({ as: Comp = "div", className, children, delayMs = 0 }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // delay to allow staggering between siblings
            const id = setTimeout(() => setShow(true), delayMs)
            return () => clearTimeout(id)
          }
        })
      },
      { threshold: 0.16 },
    )
    observer.observe(node)
    return () => observer.unobserve(node)
  }, [delayMs])

  return (
    <Comp
      ref={ref as any}
      className={cn(
        "transition-all duration-700 ease-out",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      )}
    >
      {children}
    </Comp>
  )
}
