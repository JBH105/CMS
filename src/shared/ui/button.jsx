"use client";

import React from "react";
import { cn } from "@/lib/utils";

function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  // Base style (simple + clean)
  let base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition px-3 py-1.5 cursor-pointer";

  // Variants (simple control)
  let variants = {
    default: "text-black",
    outline: " bg-white hover:bg-gray-100",
    destructive: "bg-white hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  };

  // Sizes
  let sizes = {
    default: "",
    sm: "text-sm px-2 py-1",
    lg: "text-base px-4 py-2",
    icon: "p-2",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export { Button };