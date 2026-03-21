"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import FloatingField from "@/shared/field/FloatingField";
import FloatingSelect from "@/shared/field/FloatingSelect";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  project_name: Yup.string().required("Project name is required"),
  platform: Yup.string().required("Platform is required"),
  communication: Yup.string().required("Communication method is required"),
  status: Yup.string().required("Status is required"),
  payment_terms: Yup.string().required("Payment terms are required"),
  account: Yup.string().required("Account is required"),
  rate: Yup.string().required("Rate is required"),
});

const ClientForm = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialData = null,
  mode = "create",
}) => {
  const isEdit = mode === "update";

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      project_name: initialData?.project_name || "",
      platform: initialData?.platform || "",
      communication: initialData?.communication || "",
      status: initialData?.status || "",
      payment_terms: initialData?.payment_terms || "",
      account: initialData?.account || "",
      rate: initialData?.rate || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEdit && initialData) {
        onSubmit({ id: initialData._id, ...values });
      } else {
        onSubmit(values);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      {/* Modal - with proper scrolling for all screen sizes */}
      <div className="w-full max-w-2xl max-h-[85vh] bg-white rounded-xl shadow-2xl shadow-black/10 border border-zinc-200 flex flex-col overflow-hidden will-change-transform">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            {isEdit ? "Update Client" : "Create New Client"}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {isEdit ? "Modify the client's information below." : "Enter the details to create a new client."}
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="client-form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* Client Information */}
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Client Information
              </h3>
            </div>

            <FloatingField id="name" label="Client Name" formik={formik} />
            <FloatingField
              id="project_name"
              label="Project Name"
              formik={formik}
            />
            <FloatingField id="platform" label="Platform" formik={formik} />

            <FloatingSelect
              id="status"
              label="Status"
              formik={formik}
              options={[
                { value: "Open", label: "Open" },
                { value: "Sale", label: "Sale" },
                { value: "Close", label: "Close" },
                { value: "Pending", label: "Pending" },
              ]}
            />

            <div className="col-span-1 sm:col-span-2">
              <FloatingField
                id="communication"
                label="Communication Method"
                formik={formik}
                as={Textarea}
              />
            </div>

            {/* Payment Information */}
            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Payment Information
              </h3>
            </div>

            <FloatingField
              id="account"
              label="Account Number"
              formik={formik}
            />
            <FloatingField id="rate" label="Rate" formik={formik} />

            <div className="col-span-1 sm:col-span-2">
              <FloatingField
                id="payment_terms"
                label="Payment Terms"
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
              form="client-form"
              disabled={loading}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium shadow-sm transition-all"
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update Client"
                  : "Create Client"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
