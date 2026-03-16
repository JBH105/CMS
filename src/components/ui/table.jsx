import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto",

        // 🌊 Water Glass Effect
        "bg-white/60 backdrop-blur-xl",

        // soft border
        "border border-white/40",

        // soft shadow
        "shadow-lg shadow-blue-100/40",

        // rounded modern card
        "rounded-xl",

        className
      )}
    >
      <table className="w-full text-sm text-left" {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn(
        "bg-gradient-to-r from-blue-100/70 via-sky-100/60 to-cyan-100/60",
        "backdrop-blur-md",
        "[&_tr]:border-b [&_tr]:border-white/40",
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      className={cn(
        "divide-y divide-blue-100",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "transition-all duration-200",
        "hover:bg-blue-50/60",
        "hover:backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "px-6 py-4 text-xs font-semibold",
        "text-gray-700 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      className={cn(
        "px-6 py-4 text-gray-700 whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TableBadge({ variant = "default", className, ...props }) {
  const variants = {
    default: "bg-blue-100/70 text-blue-700 backdrop-blur-sm",
    success: "bg-green-100/70 text-green-700 backdrop-blur-sm",
    warning: "bg-yellow-100/70 text-yellow-700 backdrop-blur-sm",
    danger: "bg-red-100/70 text-red-700 backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableBadge,
};