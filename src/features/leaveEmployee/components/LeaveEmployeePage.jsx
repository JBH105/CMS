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
  const [createLeave, { isLoading: isCreating }] = useCreateLeaveRequestMutation(); // You'll need to add this hook

  const leaves = response?.data || [];

  const handleApprove = async (id) => {
    try {
      await approveLeaveRequest(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Approve error", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeaveRequest(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Reject error", error);
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
      // Add your API call here to submit leave application
      await createLeave(values).unwrap();
      setIsModalOpen(false);
      refetch(); // Refresh the leaves list
    } catch (error) {
      console.error("Error creating leave:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading leaves...</div>
      </div>
    );
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
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