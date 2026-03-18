import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }) {
  return (
    <textarea
      placeholder=" "
      className={cn(
        "peer w-full min-h-[100px] rounded-lg",
        "border border-blue-400",
        "bg-white backdrop-blur-[1px]",
        "px-3 pt-4 pb-1 text-sm text-gray-800",
        "outline-none transition-all resize-none",
        "placeholder-black/60",
        "focus:border-blue-600 focus:ring-1 focus:ring-blue-200",
        "shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }