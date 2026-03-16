"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none backdrop-blur-md shadow-sm active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-400/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600/90 text-white border-blue-500 backdrop-blur-md hover:bg-blue-600 hover:shadow-md",

        outline:
          "bg-white/70 text-blue-700 border-blue-200 backdrop-blur-md hover:bg-blue-50 hover:border-blue-300",

        secondary:
          "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",

        ghost:
          "text-blue-700 hover:bg-blue-50",

        destructive:
          "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",

        link:
          "text-blue-600 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 gap-2",

        xs: "h-6 px-2 text-xs",

        sm: "h-7 px-3 text-sm",

        lg: "h-10 px-5 text-base",

        icon: "size-9",

        "icon-xs": "size-6",

        "icon-sm": "size-7",

        "icon-lg": "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }