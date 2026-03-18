"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const getStatusBadge = (status) => {
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    "on-leave": "bg-yellow-100 text-yellow-700",
    inactive: "bg-gray-100 text-gray-700",
    terminated: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status
        ? status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
        : "Unknown"}
    </span>
  );
};

const columns = [
  
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email", sortable: true },
  { key: "phone", title: "Phone" },
  {
    key: "gender",title: "Gender"},
  {
    key: "joiningDate",
    title: "Joining Date",
    sortable: true,
    render: (value) => (value ? new Date(value).toLocaleDateString() : "N/A"),
  },

  {
    key: "currentSalary",
    title: "Current Salary",
    sortable: true,
    render: (value) => (value ? `₹${value}` : "N/A"),
  },

  // 🔥 Address BEFORE actions
  {
    key: "address",
    title: "Address",
    render: (value) => value || "N/A",
  },

  {
    key: "guardianInfo",
    title: "Guardian Info",
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          {row.guardianRelation || "N/A"}
        </span>
        <span className="text-xs text-gray-500">
          {row.guardianNumber || "N/A"}
        </span>
      </div>
    ),
  },
];

const EmployeeTable = ({ data, loading, onEdit, onDelete }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <DataTable
      data={data || []}
      columns={columns}
      showActions={true}
      actions={(row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      pagination={true}
      rowsPerPage={10}
      sortable={true}
    />
  );
};

export default EmployeeTable;
