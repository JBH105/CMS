import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto",
        "bg-white border border-gray-200 rounded-lg",
        className
      )}
    >
      <table className="w-full text-sm text-left text-gray-700" {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn(
        "bg-blue-50 border-b border-gray-200",
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody className={cn("", className)} {...props} />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "border-b border-gray-100 hover:bg-blue-50 transition-colors",
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
        "px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide",
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
        "px-4 py-3 text-gray-700",
        className
      )}
      {...props}
    />
  );
}

function TableBadge({ variant = "default", className, ...props }) {
  const variants = {
    default: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-sky-100 text-sky-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md",
        variants[variant] || variants.default,
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