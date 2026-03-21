"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";
import { Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { capitalizeWords } from "@/utils/formater";

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
  {
    key: "name",
    title: "Name",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "email",
    title: "Email",
    sortable: true,
    render: (value) => (
      <a
        href={`mailto:${value}`}
        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm group"
      >
        <Mail size={14} className="text-zinc-400 group-hover:text-zinc-900" />
        <span>{value}</span>
      </a>
    ),
  },
  {
    key: "phone",
    title: "Phone",
    render: (value) => (
      <a
        href={`tel:${value}`}
        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm group"
      >
        <Phone size={14} className="text-zinc-400 group-hover:text-zinc-900" />
        <span>{value}</span>
      </a>
    ),
  },
  {
    key: "gender",
    title: "Gender",
    sortable: false,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
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
    render: (value) => (
      <span className="font-medium text-gray-600">
        {value ? `₹${value}` : "N/A"}
      </span>
    ),
  },

  {
    key: "address",
    title: "Address",
    render: (value) => (
      <span className="font-medium text-gray-600">{value || "N/A"}</span>
    ),
  },

  {
    key: "guardianInfo",
    title: "Guardian Info",
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">
          {row.guardianRelation || "N/A"}
        </span>
        <a
          href={`tel:${row.guardianNumber}`}
          className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors group"
        >
          <Phone
            size={14}
            className="text-zinc-400 group-hover:text-zinc-900"
          />
          <span>{row.guardianNumber}</span>
        </a>
      </div>
    ),
  },
];

const EmployeeTable = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable
      data={data || []}
      loading={loading}
      columns={columns}
      showActions={true}
      actions={(row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row)}
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 p-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row)}
            className="text-rose-600 hover:text-rose-900 hover:bg-rose-50 p-2"
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
