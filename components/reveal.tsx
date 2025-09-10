import * as React from "react"
import { cn } from "@/lib/utils"

type RevealProps<T extends React.ElementType = "div"> = {
  as?: T
  className?: string
  children: React.ReactNode
  delayMs?: number
}

export function Reveal<T extends React.ElementType = "div">({
  as,
  className,
  children,
  delayMs = 0,
}: RevealProps<T>) {
  const Comp = as || "div"

  // Infer correct ref type for the given element/component
  const ref = React.useRef<React.ElementRef<T> | null>(null)
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
      ref={ref} // now correctly typed
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
