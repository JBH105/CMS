"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import FloatingField from "@/shared/field/FloatingField";
import FloatingSelect from "@/shared/field/FloatingSelect";

/* ---------------- VALIDATION ---------------- */

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  gender: Yup.string().required("Gender is required"),
  startingSalary: Yup.number()
    .required("Starting salary is required")
    .positive("Must be positive"),
  currentSalary: Yup.number()
    .required("Current salary is required")
    .positive("Must be positive"),
  offerDetails: Yup.string().required("Offer details are required"),
  joiningDate: Yup.date().required("Joining date is required"),
  birthDate: Yup.date().required("Birth date is required"),
  address: Yup.string().required("Address is required"),
  guardianRelation: Yup.string().required("Guardian relation is required"),
  guardianNumber: Yup.string().required("Guardian number is required"),
  biometricId: Yup.string().required("Biometric ID is required"),
});

/* ---------------- MODAL ---------------- */

const CreateEmployee = ({ open, onClose, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      startingSalary: "",
      currentSalary: "",
      offerDetails: "",
      joiningDate: "",
      birthDate: "",
      address: "",
      guardianRelation: "",
      guardianNumber: "",
      biometricId: "",
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
            Create New Employee
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
            {/* Personal Information */}
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
                Personal Information
              </h3>
            </div>
            
            <FloatingField id="name" label="Full Name" formik={formik} />
            <FloatingField id="email" label="Email" type="email" formik={formik} />
            <FloatingField id="phone" label="Phone Number" type="tel" formik={formik} />
            <FloatingSelect 
              id="gender" 
              label="Gender" 
              formik={formik} 
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" }
              ]}
            />
            <FloatingField id="birthDate" label="Birth Date" type="date" formik={formik} />
            <FloatingField id="joiningDate" label="Joining Date" type="date" formik={formik} />
            
            {/* Address */}
            <div className="col-span-1 sm:col-span-2">
              <FloatingField 
                id="address" 
                label="Address" 
                formik={formik} 
                as={Textarea}
              />
            </div>

            {/* Salary Information */}
            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
                Salary Information
              </h3>
            </div>
            
            <FloatingField id="startingSalary" label="Starting Salary" type="number" formik={formik} />
            <FloatingField id="currentSalary" label="Current Salary" type="number" formik={formik} />
            
            <div className="col-span-1 sm:col-span-2">
              <FloatingField 
                id="offerDetails" 
                label="Offer Details" 
                formik={formik} 
                as={Textarea}
              />
            </div>

            {/* Emergency Contact */}
            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
                Emergency Contact
              </h3>
            </div>
            
            <FloatingField id="guardianRelation" label="Guardian Relation" formik={formik} />
            <FloatingField id="guardianNumber" label="Guardian Number" type="tel" formik={formik} />

            {/* Work Information */}
            <div className="col-span-1 sm:col-span-2 mt-2">
              <h3 className="text-md font-medium text-gray-700 mb-3 pb-1 border-b border-gray-200">
                Work Information
              </h3>
            </div>
            
            <FloatingField id="biometricId" label="Biometric ID" formik={formik} />
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
              {loading ? "Creating..." : "Create Employee"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;