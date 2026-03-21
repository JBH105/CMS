"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import FloatingField from "@/shared/field/FloatingField";
import FloatingSelect from "@/shared/field/FloatingSelect";

/* ---------------- VALIDATION ---------------- */

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  gender: Yup.string().required("Gender is required"),
  startingSalary: Yup.number().required().positive(),
  currentSalary: Yup.number().required().positive(),
  offerDetails: Yup.string().required(),
  joiningDate: Yup.date().required(),
  birthDate: Yup.date().required(),
  address: Yup.string().required(),
  guardianRelation: Yup.string().required(),
  guardianNumber: Yup.string().required(),
  pin: Yup.string().required(),
  increments: Yup.array().of(
    Yup.object().shape({
      date: Yup.date().nullable(),
      amount: Yup.number().nullable(),
    }),
  ),
});

/* ---------------- COMPONENT ---------------- */

const UpdateEmployee = ({ open, onClose, onSubmit, loading, employee }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      gender: employee?.gender || "",
      startingSalary: employee?.startingSalary || "",
      currentSalary: employee?.currentSalary || "",
      offerDetails: employee?.offerDetails || "",
      joiningDate: employee?.joiningDate?.split("T")[0] || "",
      birthDate: employee?.birthDate?.split("T")[0] || "",
      address: employee?.address || "",
      guardianRelation: employee?.guardianRelation || "",
      guardianNumber: employee?.guardianNumber || "",
      pin: employee?.biometricId || "",
      increments:
        employee?.increments?.map((inc) => ({
          date: inc.date ? inc.date.split("T")[0] : "",
          amount: inc.amount || "",
        })) || [],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        id: employee?._id,
        ...values,
      });
    },
  });
  console.log("🚀 ~ UpdateEmployee ~ formik:", formik?.values?.increments)

  useEffect(() => {
    if (!open) formik.resetForm();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="w-full max-w-3xl max-h-[85vh] bg-white rounded-xl shadow-2xl shadow-black/10 border border-zinc-200 flex flex-col overflow-hidden will-change-transform">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Update Employee
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Edit the details for this employee.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form
            id="update-employee-form"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Personal Information
              </h3>
            </div>

            <FloatingField id="name" label="Full Name" formik={formik} />
            <FloatingField id="email" label="Email" formik={formik} />
            <FloatingField id="phone" label="Phone" formik={formik} />

            <FloatingSelect
              id="gender"
              label="Gender"
              formik={formik}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />

            <FloatingField
              id="birthDate"
              type="date"
              label="Birth Date"
              formik={formik}
            />
            <FloatingField
              id="joiningDate"
              type="date"
              label="Joining Date"
              formik={formik}
            />

            <div className="col-span-2">
              <FloatingField
                id="address"
                label="Address"
                formik={formik}
                as={Textarea}
              />
            </div>

            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Salary Information
              </h3>
            </div>

            <FloatingField
              id="startingSalary"
              type="number"
              label="Starting Salary"
              formik={formik}
            />
            <FloatingField
              id="currentSalary"
              type="number"
              label="Current Salary"
              formik={formik}
            />

            <div className="col-span-2">
              <FloatingField
                id="offerDetails"
                label="Offer Details"
                formik={formik}
                as={Textarea}
              />
            </div>

            {/* Increment Section */}
            <div className="col-span-1 sm:col-span-2 mt-4">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Increments
              </h3>

              {/* Add Button */}
              <Button
                type="button"
                variant="outline"
                className="mb-4"
                onClick={() =>
                  formik.setFieldValue("increments", [
                    ...formik.values.increments,
                    { date: "", amount: "" },
                  ])
                }
              >
                + Add Increment
              </Button>

              {/* Increment Fields */}
              {formik.values.increments.map((inc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 border border-zinc-100 rounded-md bg-zinc-50/50"
                >
                  {/* Date Field */}
                  <FloatingField
                    id={`increments[${index}].date`}
                    label="Increment Date"
                    type="date"
                    formik={formik}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0], // future only
                    }}
                  />

                  {/* Amount Field */}
                  <FloatingField
                    id={`increments[${index}].amount`}
                    label="Increment Amount"
                    type="number"
                    formik={formik}
                  />

                  {/* Remove Button */}
                  <div className="col-span-1 sm:col-span-2 flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const updated = formik.values.increments.filter(
                          (_, i) => i !== index,
                        );
                        formik.setFieldValue("increments", updated);
                      }}
                    >
                      Remove Increment
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Emergency Contact
              </h3>
            </div>

            <FloatingField
              id="guardianRelation"
              label="Relation"
              formik={formik}
            />
            <FloatingField
              id="guardianNumber"
              label="Guardian Number"
              formik={formik}
            />

            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                Work Information
              </h3>
            </div>

            <FloatingField id="pin" label="Pin" formik={formik} />
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
              form="update-employee-form"
              disabled={loading}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium shadow-sm"
            >
              {loading ? "Updating..." : "Update Employee"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
