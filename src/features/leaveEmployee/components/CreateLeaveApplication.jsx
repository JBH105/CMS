"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import FloatingField from "@/shared/field/FloatingField";
import FloatingSelect from "@/shared/field/FloatingSelect";

/* ---------------- VALIDATION ---------------- */

const validationSchema = Yup.object({
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  startTime: Yup.string().when('leaveType', {
    is: (val) => val === 'half-day' || val === 'short-leave',
    then: (schema) => schema.required("Start time is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  endTime: Yup.string().when('leaveType', {
    is: (val) => val === 'half-day' || val === 'short-leave',
    then: (schema) => schema.required("End time is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  reason: Yup.string()
    .required("Reason is required")
    .min(5, "Reason must be at least 5 characters"),
  leaveType: Yup.string()
    .required("Leave type is required")
    .oneOf(["full-day", "half-day", "short-leave"], "Invalid leave type"),
});

/* ---------------- MODAL ---------------- */

const CreateLeaveApplication = ({ open, onClose, onSubmit, loading }) => {
  const leaveTypeOptions = [
    { value: "full-day", label: "Full Day" },
    { value: "half-day", label: "Half Day" },
    { value: "short-leave", label: "Short Leave" },
  ];

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      reason: "",
      leaveType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // Show/hide time fields based on leave type
  const showTimeFields = ['half-day', 'short-leave'].includes(formik.values.leaveType);

  // Auto-populate end date if it's a half day or short leave
  useEffect(() => {
    if (formik.values.leaveType === 'half-day' || formik.values.leaveType === 'short-leave') {
      if (formik.values.startDate && !formik.values.endDate) {
        formik.setFieldValue('endDate', formik.values.startDate);
      }
    }
  }, [formik.values.leaveType, formik.values.startDate, formik.setFieldValue]);

  // Reset time fields when leave type changes to full day
  useEffect(() => {
    if (formik.values.leaveType === 'full-day') {
      formik.setFieldValue('startTime', '');
      formik.setFieldValue('endTime', '');
    }
  }, [formik.values.leaveType, formik.setFieldValue]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open, formik.resetForm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      
      {/* Modal - with proper scrolling for all screen sizes */}
      <div className="w-full max-w-3xl max-h-[85vh] bg-white rounded-xl shadow-2xl shadow-black/10 border border-zinc-200 flex flex-col overflow-hidden will-change-transform">
        {/* Fixed Header */}
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Create Leave Application
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Submit your leave request for approval.
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="create-leave-form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* Leave Type - Full width on flex, half on desktop */}
            <div className="sm:col-span-2">
              <FloatingSelect
                id="leaveType"
                label="Leave Type"
                options={leaveTypeOptions}
                formik={formik}
              />
            </div>

            {/* Start Date */}
            <FloatingField
              id="startDate"
              label="Start Date"
              type="date"
              formik={formik}
            />

            {/* End Date */}
            <FloatingField
              id="endDate"
              label="End Date"
              type="date"
              formik={formik}
              disabled={showTimeFields}
            />

            {/* Time fields - Conditional rendering */}
            {showTimeFields && (
              <>
                <FloatingField
                  id="startTime"
                  label="Start Time"
                  type="time"
                  formik={formik}
                />
                <FloatingField
                  id="endTime"
                  label="End Time"
                  type="time"
                  formik={formik}
                />
              </>
            )}

            {/* Reason - Full width */}
            <div className="sm:col-span-2">
              <FloatingField
                id="reason"
                label="Reason for Leave"
                formik={formik}
                as={Textarea}
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 shadow-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-leave-form"
              disabled={loading || !formik.isValid || !formik.dirty}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium shadow-sm transition-all"
            >
              {loading ? "Submitting..." : "Submit Leave Application"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLeaveApplication;