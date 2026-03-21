import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }) {
  return (
    <textarea
      placeholder=" "
      className={cn(
        "peer w-full min-h-[80px] rounded-md",
        "border border-zinc-200",
        "bg-white",
        "px-3 py-2 text-sm text-zinc-900",
        "outline-none transition-all resize-none",
        "placeholder:text-zinc-400",
        "focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900",
        "shadow-sm",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }