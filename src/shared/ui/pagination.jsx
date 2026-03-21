import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul className={cn("flex items-center gap-1", className)} {...props} />
  );
}

function PaginationItem(props) {
  return <li {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  onClick,
  ...props
}) {
  return (
    <Button
      type="button"
      variant={isActive ? "outline" : "ghost"}
      size={size}
      onClick={onClick}
      className={cn("cursor-pointer active:scale-95", className)}
      {...props}
    />
  );
}

function PaginationPrevious({ className, onClick, text = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      onClick={onClick}
      className={cn("pl-2", className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, onClick, text = "", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      onClick={onClick}
      className={cn("pr-2", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn("flex size-8 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4" />
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};