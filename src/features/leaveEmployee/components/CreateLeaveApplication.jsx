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

/* ---------------- FLOATING INPUT ---------------- */

const FloatingField = ({ id, label, type = "text", formik, disabled = false, ...props }) => {
  const error = formik.touched[id] && formik.errors[id];
  const hasValue = !!formik.values[id];

  return (
    <div className="relative w-full">
      <Input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        value={formik.values[id] || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={disabled}
        className={`peer h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-all
        ${disabled ? 'bg-gray-50 text-gray-500' : ''}
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }`}
        {...props}
      />

      <label
        htmlFor={id}
        className={`
        absolute left-3 px-1
        pointer-events-none
        transition-all duration-200 ease-in-out
        ${
          hasValue || type === 'date' || type === 'time'
            ? '-top-2 text-xs bg-white text-gray-600'
            : 'top-3 text-sm text-gray-500'
        }
        ${error ? 'text-red-500' : ''}
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-blue-600
        peer-focus:bg-white
        `}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );
};

/* ---------------- FLOATING SELECT ---------------- */

const FloatingSelect = ({ id, label, options, formik }) => {
  const error = formik.touched[id] && formik.errors[id];
  const hasValue = !!formik.values[id];
  const triggerRef = useRef(null);

  return (
    <div className="relative w-full">
      <Select
        onValueChange={(value) => formik.setFieldValue(id, value)}
        value={formik.values[id]}
        onOpenChange={(open) => {
          if (open) formik.setFieldTouched(id, true);
        }}
      >
        <SelectTrigger
          ref={triggerRef}
          className={`peer h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-all
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label
        htmlFor={id}
        className={`
        absolute left-3 px-1
        pointer-events-none
        transition-all duration-200 ease-in-out
        ${
          hasValue
            ? '-top-2 text-xs bg-white text-gray-600'
            : 'top-3 text-sm text-gray-500'
        }
        ${error ? 'text-red-500' : ''}
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-blue-600
        peer-focus:bg-white
        `}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );
};

/* ---------------- FLOATING TEXTAREA ---------------- */

const FloatingTextarea = ({ id, label, formik }) => {
  const error = formik.touched[id] && formik.errors[id];
  const hasValue = !!formik.values[id];

  return (
    <div className="relative w-full">
      <Textarea
        id={id}
        name={id}
        placeholder=" "
        value={formik.values[id] || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`peer min-h-[100px] w-full rounded-lg border bg-white px-3 text-sm outline-none transition-all resize-none pt-4
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }`}
      />

      <label
        htmlFor={id}
        className={`
        absolute left-3 px-1
        pointer-events-none
        transition-all duration-200 ease-in-out
        ${
          hasValue
            ? '-top-2 text-xs bg-white text-gray-600'
            : 'top-4 text-sm text-gray-500'
        }
        ${error ? 'text-red-500' : ''}
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-blue-600
        peer-focus:bg-white
        `}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );
};

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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      
      {/* Modal - with proper scrolling for all screen sizes */}
      <div
        className="
        w-full
        max-w-3xl
        max-h-[90vh]
        bg-white
        rounded-2xl
        shadow-xl
        border border-gray-200
        flex
        flex-col
        "
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 md:p-8 pb-2 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Create Leave Application
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Submit your leave request for approval
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pt-2">
          <form
            onSubmit={formik.handleSubmit}
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4 sm:gap-5
            "
          >
            {/* Leave Type - Full width on mobile, half on desktop */}
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
              <FloatingTextarea
                id="reason"
                label="Reason for Leave"
                formik={formik}
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="p-4 sm:p-6 md:p-8 pt-2 border-t border-gray-100">
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              disabled={loading || !formik.isValid || !formik.dirty}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm sm:text-base"
            >
              {loading ? "Submitting..." : "Submit Leave Application"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLeaveApplication;