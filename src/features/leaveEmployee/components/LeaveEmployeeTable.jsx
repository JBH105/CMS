"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";
import { Check, X } from "lucide-react";
import { capitalizeWords } from "@/utils/formater";

const LeaveEmployeeTable = ({ data = [], role, onApprove, onReject, loading }) => {
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
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {capitalizeWords(getEmployeeName(row))}
            </span>
          ),
        },
        {
          key: "company",
          title: "Company",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {getCompanyName(row)}
            </span>
          ),
        },
        { key: "leaveType", title: "Leave Type" },
        {
          key: "from",
          title: "From",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.startDate)}
            </span>
          ),
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.endDate)}
            </span>
          ),
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
        },
      );
    } else if (role === "company") {
      baseColumns.push(
        {
          key: "employeeName",
          title: "Employee Name",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {capitalizeWords(getEmployeeName(row))}
            </span>
          ),
        },
        {
          key: "leaveType",
          title: "Leave Type",
          render: (value) => (
            <span className="font-medium text-gray-600">
              {capitalizeWords(value)}
            </span>
          ),
        },
        {
          key: "from",
          title: "From",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.startDate)}
            </span>
          ),
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.endDate)}
            </span>
          ),
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
        },
      );
    } else if (role === "employee") {
      baseColumns.push(
        { key: "leaveType", title: "Leave Type", render: (value) => (
            <span className="font-medium text-gray-600">
              {capitalizeWords(value)}
            </span>
          ) },
        {
          key: "from",
          title: "From",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.startDate)}
            </span>
          ),
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.endDate)}
            </span>
          ),
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
        },
      );
    } else if (role === "hr") {
      baseColumns.push(
        {
          key: "employeeName",
          title: "Employee Name",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {getEmployeeName(row)}
            </span>
          ),
        },
        {
          key: "leaveType",
          title: "Leave Type",
          render: (value) => (
            <span className="font-medium text-gray-600">
              {capitalizeWords(value)}
            </span>
          ),
        },
        {
          key: "from",
          title: "From",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.startDate)}
            </span>
          ),
        },
        {
          key: "to",
          title: "To",
          render: (_, row) => (
            <span className="font-medium text-gray-600">
              {formatDate(row.endDate)}
            </span>
          ),
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
        },
      );
    }

    return baseColumns;
  };

  const columns = getColumns();

  return (
    <DataTable
      data={safeData}
      columns={columns}
      loading={loading}
      pagination
      sortable
      actions={
        role === "company" || role === "hr"
          ? (row) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="text-green-600"
                  variant="outline"
                  onClick={() => onApprove(row._id)}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="text-red-600"
                  variant="outline"
                  onClick={() => onReject(row._id)}
                >
                  <X className="w-4 h-4" />
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
