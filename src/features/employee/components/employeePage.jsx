"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import EmployeeTable from "./employeeTable";
import CreateEmployee from "./createEmployee";
import {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../services/employeeApi";
import { toast } from "sonner";
import UpdateEmployee from "./updateEmployee";
import CommonDialog from "@/shared/dialog/dialog";
import EmptyPage from "@/shared/emptypage/emptyPage";
import { Users } from "lucide-react";

const EmployeePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: employees, isLoading, isFetching, refetch } = useGetEmployeesQuery();
  const isDataLoading = isLoading || isFetching;

  const [createEmployee, { isLoading: createLoading }] =
    useCreateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updateEmployee, { isLoading: updateLoading }] =
    useUpdateEmployeeMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleDelete = (row) => {
    setSelectedEmployee(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee?._id).unwrap();

      toast.success("Employee deleted successfully");

      setDeleteDialogOpen(false);
      setSelectedEmployee(null);

      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to delete employee");
    }
  };

  const handleEdit = (row) => {
    setSelectedEmployee(row);
    setUpdateModalOpen(true);
  };

  const handleUpdateEmployee = async (values) => {
    try {
      await updateEmployee(values).unwrap();
      toast.success("Employee updated successfully");
      setUpdateModalOpen(false);
      setSelectedEmployee(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to update employee");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full  mx-auto p-4 sm:p-5 lg:p-5 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Employees</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your team members and their records.
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm rounded-md transition-all flex items-center gap-2"
          >
            Create Employee
          </Button>
        </div>

        {isDataLoading || (employees?.data && employees.data.length > 0) ? (
          <EmployeeTable
            data={employees?.data || []}
            loading={isDataLoading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <EmptyPage
            title="No Employees Found"
            description="Add your first employee to start managing your team."
            buttonText="Create Employee"
            onAction={() => setModalOpen(true)}
            icon={Users}
          />
        )}
      </div>

      <CreateEmployee
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateEmployee}
        loading={createLoading}
      />

      <UpdateEmployee
        open={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleUpdateEmployee}
        loading={updateLoading}
        employee={selectedEmployee}
      />

      <CommonDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={confirmDelete}
        loading={false} // you can improve later
        title="Delete Employee"
        description={`Are you sure you want to delete ${selectedEmployee?.name || "this employee"}? This action cannot be undone.`}
      />
    </div>
  );
};

export default EmployeePage;
