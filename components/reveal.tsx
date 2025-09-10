

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
  delayMs?: number
}

type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"]

const Reveal = React.forwardRef(
  <T extends React.ElementType = "div">(
    { as, className, children, delayMs = 0 }: RevealProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Comp = as || "div"
    const localRef = React.useRef<HTMLElement | null>(null)

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node

        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
      if (!localRef.current) return

      const node = localRef.current as Element

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
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
        ref={combinedRef}
        className={cn(
          "transition-all duration-700 ease-out",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          className,
        )}
      >
        {children}
      </Comp>
    )
  },
)

Reveal.displayName = "Reveal"

export { Reveal }
