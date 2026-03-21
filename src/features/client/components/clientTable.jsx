"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { capitalizeWords } from "@/utils/formater";

const getStatusBadge = (status) => {
  const statusStyles = {
    sale: "bg-green-100 text-green-700",
    close: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-zinc-100 text-zinc-700 font-medium",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}
    >
      {status || "Unknown"}
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
    key: "project_name",
    title: "Project Name",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "platform",
    title: "Platform",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "communication",
    title: "Communication",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  {
    key: "account",
    title: "Account",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "rate",
    title: "Rate",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
  {
    key: "payment_terms",
    title: "Payment Terms",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-gray-600">
        {capitalizeWords(value)}
      </span>
    ),
  },
];

const ClientTable = ({ data, loading, onEdit, onDelete }) => {
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

export default ClientTable;
