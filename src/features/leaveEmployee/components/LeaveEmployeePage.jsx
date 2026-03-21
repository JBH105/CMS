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
import EmptyPage from "@/shared/emptypage/emptyPage";
import { CalendarOff, Plus } from "lucide-react";


const LeaveEmployeePage = ({ role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetEmployeeLeavesQuery();
  const isDataLoading = isLoading || isFetching;
  const [approveLeaveRequest] = useApproveLeaveRequestMutation();
  const [rejectLeaveRequest] = useRejectLeaveRequestMutation();
  const [createLeave, { isLoading: isCreating }] =
    useCreateLeaveRequestMutation();

  const leaves = response?.data || [];

  const handleApprove = async (id) => {
    try {
      await approveLeaveRequest(id).unwrap();

      toast.success("Leave approved");
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

      toast.success("Leave rejected");
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
  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-rose-500 text-sm font-medium">Error loading leaves data</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full  mx-auto p-4 sm:p-5 lg:p-5 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Leave Management</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage and track employee leave requests.
            </p>
          </div>

          {role === "employee" && (
            <Button
              onClick={handleApplyLeave}
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm rounded-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Apply Leave
            </Button>
          )}
        </div>

        {isDataLoading || (leaves && leaves.length > 0) ? (
          <LeaveEmployeeTable
            data={leaves || []}
            loading={isDataLoading}
            role={role}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ) : (
          <EmptyPage
            title="No Leave Requests"
            description="There are no leave requests available right now."
            buttonText="Apply Leave"
            onAction={role === "employee" ? handleApplyLeave : undefined}
            showAction={role === "employee"}
            icon={CalendarOff}
          />
        )}
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
