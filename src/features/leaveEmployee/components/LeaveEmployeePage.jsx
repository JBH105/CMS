"use client";

import React, { useState } from "react";
import LeaveEmployeeTable from "./LeaveEmployeeTable";
import { Button } from "@/shared/ui/button";
import {
  useApproveLeaveRequestMutation,
  useCreateLeaveRequestMutation,
  useGetEmployeeLeavesQuery,
  useRejectLeaveRequestMutation,
} from "@/features/leaveEmployee/services/leaveemployeeApi";
import CreateLeaveApplication from "./CreateLeaveApplication";
import { toast } from "sonner";
import Loader from "@/layout/loader/loader";


const LeaveEmployeePage = ({ role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetEmployeeLeavesQuery();
  const [approveLeaveRequest] = useApproveLeaveRequestMutation();
  const [rejectLeaveRequest] = useRejectLeaveRequestMutation();
  const [createLeave, { isLoading: isCreating }] =
    useCreateLeaveRequestMutation(); // You'll need to add this hook

  const leaves = response?.data || [];

  const handleApprove = async (id) => {
    try {
      await approveLeaveRequest(id).unwrap();

      toast.success("Leave approved 👍");
      refetch();
    } catch (error) {
      const message =
        error?.data?.error || error?.data?.message || "Failed to approve leave";

      toast.error(message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeaveRequest(id).unwrap();

      toast.success("Leave rejected ❌");
      refetch();
    } catch (error) {
      const message =
        error?.data?.error || error?.data?.message || "Failed to reject leave";

      toast.error(message);
    }
  };

  const handleApplyLeave = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (values) => {
    try {
      await createLeave(values).unwrap();

      toast.success("Leave applied successfully");

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      const message =
        error?.data?.message || error?.data?.error || "Failed to apply leave";

      toast.error(message);
      console.error("Error creating leave:", error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading leaves data</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>

          {role === "employee" && (
            <Button
              onClick={handleApplyLeave}
              className="bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium text-md shadow-md hover:shadow-lg rounded-lg transition-all duration-300 border-0"
            >
              Apply Leave
            </Button>
          )}
        </div>

        <LeaveEmployeeTable
          data={leaves}
          role={role}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Create Leave Modal */}
      <CreateLeaveApplication
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        loading={isCreating}
      />
    </div>
  );
};

export default LeaveEmployeePage;
