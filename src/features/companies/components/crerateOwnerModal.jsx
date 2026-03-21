"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingField from "@/shared/field/FloatingField";


const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});


const CreateOwnerModal = ({ open, onClose, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
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
      {/* Modal */}
      <div className="w-full max-w-md max-h-[85vh] bg-white rounded-xl shadow-2xl shadow-black/10 border border-zinc-200 flex flex-col overflow-hidden will-change-transform">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Add Company Owner
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Create a new owner account for this company.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="create-owner-form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 gap-5"
          >
            <FloatingField id="username" label="Username" formik={formik} />
            <FloatingField id="email" label="Email" type="email" formik={formik} />
            <FloatingField id="password" label="Password" type="password" formik={formik} />
          </form>
        </div>

        {/* Footer */}
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
            form="create-owner-form" // bind button to form outside of the form tag
            disabled={loading}
            className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium shadow-sm"
          >
            {loading ? "Creating..." : "Create Owner"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOwnerModal;