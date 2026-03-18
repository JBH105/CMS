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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      {/* Modal - with proper scrolling for all screen sizes */}
      <div
        className="
        w-full
        max-w-2xl
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
            {isEdit ? "Update Client" : "Create New Client"}
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
            {/* Client Information */}
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
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
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
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
    </div>
  );
};

export default ClientForm;
