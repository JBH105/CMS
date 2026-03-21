"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingField from "@/shared/field/FloatingField";

/* ---------------- VALIDATION ---------------- */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  industryName: Yup.string().required("Industry is required"),
  companySize: Yup.number().required("Company size is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.string().required("Phone required"),
  website: Yup.string().required("Website required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

/* ---------------- MODAL ---------------- */

const OnboardCompanyModal = ({ open, onClose, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      companyName: "",
      industryName: "",
      companySize: "",
      address: "",
      email: "",
      phone: "",
      website: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  /* reset form when modal closes */
  useEffect(() => {
    if (!open) formik.resetForm();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      
      {/* Modal - with proper scrolling for all screen sizes */}
      <div className="w-full max-w-3xl max-h-[85vh] bg-white rounded-xl shadow-2xl shadow-black/10 border border-zinc-200 flex flex-col overflow-hidden will-change-transform">
        {/* Fixed Header */}
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Onboard New Company
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Fill the details to register a new company.
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="onboard-company-form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <FloatingField id="companyName" label="Company Name" formik={formik} />
            <FloatingField id="industryName" label="Industry Name" formik={formik} />
            <FloatingField id="companySize" label="Company Size" type="number" formik={formik} />
            <FloatingField id="address" label="Address" formik={formik} />
            <FloatingField id="email" label="Email" type="email" formik={formik} />
            <FloatingField id="phone" label="Phone" formik={formik} />
            <FloatingField id="website" label="Website" formik={formik} />
            <FloatingField id="password" label="Password" type="password" formik={formik} />
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
              form="onboard-company-form"
              disabled={loading}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium shadow-sm"
            >
              {loading ? "Creating..." : "Create Company"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardCompanyModal;