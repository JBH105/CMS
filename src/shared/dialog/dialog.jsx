"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

const CommonDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  loading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {title}
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Footer Buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-3">
          {/* Cancel */}
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-gray-700"
          >
            Cancel
          </Button>

          {/* Confirm */}
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="
    bg-red-600 hover:bg-red-700 
    text-white 
    rounded-lg px-4 py-2 
    border border-red-600
    shadow-sm hover:shadow-md
    transition-all duration-200 ease-in-out
    active:scale-[0.97]
    focus-visible:ring-2 focus-visible:ring-red-400/40 focus-visible:outline-none
    disabled:opacity-70 disabled:cursor-not-allowed
  "
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
