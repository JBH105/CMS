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
            Onboard New Company
          </h2>
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
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm sm:text-base"
            >
              {loading ? "Creating..." : "Create Company"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardCompanyModal;