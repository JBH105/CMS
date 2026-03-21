"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all cursor-pointer " +
    "disabled:pointer-events-none disabled:opacity-50 outline-none active:scale-[0.98] " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 shrink-0";

  const variants = {
    default:
      "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",

    destructive:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-sm",

    outline:
      "bg-white border text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 shadow-sm",

    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80",

    ghost:
      "text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900",

    link:
      "text-zinc-900 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-10 px-8 text-sm",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export { Button };