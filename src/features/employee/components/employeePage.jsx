"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import EmployeeTable from "./employeeTable";
import CreateEmployee from "./createEmployee";
import {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation
} from "../services/employeeApi";
import { toast } from "sonner";
import Loader from "@/layout/loader/loader";

const EmployeePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: employees, isLoading, refetch } = useGetEmployeesQuery();
  const [createEmployee, { isLoading: createLoading }] = useCreateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCreateEmployee = async (values) => {
    try {
      await createEmployee(values).unwrap();
      toast.success("Employee created successfully");
      setModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to create employee");
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(row.id).unwrap();
        toast.success("Employee deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.error || "Failed to delete employee");
      }
    }
  };

  const handleEdit = (row) => {
    console.log("Edit clicked", row);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <Button 
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium text-md shadow-md hover:shadow-lg rounded-lg transition-all duration-300 border-0"
          >
            Create Employee
          </Button>
        </div>

        <EmployeeTable
          data={employees?.data}
          loading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <CreateEmployee
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateEmployee}
        loading={createLoading}
      />
    </div>
  );
};

export default EmployeePage;