"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";

const LeaveEmployeeTable = ({ data = [], role, onApprove, onReject }) => {
  console.log("🚀 ~ LeaveEmployeeTable ~ role:", role)
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const getEmployeeName = (row) => {
    // You might need to fetch employee details or they might be populated in the response
    return row.employeeId?.name || row.employeeName || "Unknown Employee";
  };

  const getCompanyName = (row) => {
    // You might need to fetch company details or they might be populated in the response
    return row.companyId?.name || row.company || "Unknown Company";
  };

  const getColumns = () => {
    const baseColumns = [];

    if (role === "admin") {
      baseColumns.push(
        { 
          key: "employeeName", 
          title: "Employee Name",
          render: (_, row) => getEmployeeName(row)
        },
        { 
          key: "company", 
          title: "Company",
          render: (_, row) => getCompanyName(row)
        },
        { key: "leaveType", title: "Leave Type" },
        {
          key: "from",
          title: "From",
          render: (_, row) => formatDate(row.startDate)
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => formatDate(row.endDate)
        },
        {
          key: "status",
          title: "Status",
          render: (value) => (
            <span
              className={`px-2 py-1 rounded text-xs font-medium
                ${value === "approved" ? "bg-green-100 text-green-700" : ""}
                ${value === "rejected" ? "bg-red-100 text-red-700" : ""}
                ${value === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
              `}
            >
              {value}
            </span>
          ),
        }
      );
    } else if (role === "company") {
      baseColumns.push(
        { 
          key: "employeeName", 
          title: "Employee Name",
          render: (_, row) => getEmployeeName(row)
        },
        { key: "leaveType", title: "Leave Type" },
        {
          key: "from",
          title: "From",
          render: (_, row) => formatDate(row.startDate)
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => formatDate(row.endDate)
        },
        {
          key: "status",
          title: "Status",
          render: (value) => (
            <span
              className={`px-2 py-1 rounded text-xs font-medium
                ${value === "approved" ? "bg-green-100 text-green-700" : ""}
                ${value === "rejected" ? "bg-red-100 text-red-700" : ""}
                ${value === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
              `}
            >
              {value}
            </span>
          ),
        }
      );
    } else if (role === "employee") {
      baseColumns.push(
        { key: "leaveType", title: "Leave Type" },
        {
          key: "from",
          title: "From",
          render: (_, row) => formatDate(row.startDate)
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => formatDate(row.endDate)
        },
        {
          key: "status",
          title: "Status",
          render: (value) => (
            <span
              className={`px-2 py-1 rounded text-xs font-medium
                ${value === "approved" ? "bg-green-100 text-green-700" : ""}
                ${value === "rejected" ? "bg-red-100 text-red-700" : ""}
                ${value === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
              `}
            >
              {value}
            </span>
          ),
        }
      );
    } else if (role === "hr") {
      baseColumns.push(
        { 
          key: "employeeName", 
          title: "Employee Name",
          render: (_, row) => getEmployeeName(row)
        },
        { key: "leaveType", title: "Leave Type" },
        {
          key: "from",
          title: "From",
          render: (_, row) => formatDate(row.startDate)
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => formatDate(row.endDate)
        },
        {
          key: "status",
          title: "Status",
          render: (value) => (
            <span
              className={`px-2 py-1 rounded text-xs font-medium
                ${value === "approved" ? "bg-green-100 text-green-700" : ""}
                ${value === "rejected" ? "bg-red-100 text-red-700" : ""}
                ${value === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
              `}
            >
              {value}
            </span>
          ),
        }
      );
    }

    return baseColumns;
  };

  const columns = getColumns();

  return (
    <DataTable
      data={safeData}
      columns={columns}
      pagination
      sortable
      actions={
        role === "company" || role === "hr"
          ? (row) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => onApprove(row._id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReject(row._id)}
                >
                  Reject
                </Button>
              </div>
            )
          : null
      }
      showActions={role !== "employee"}
    />
  );
};

export default LeaveEmployeeTable;