"use client";

import React from "react";
import DataTable from "@/shared/Table/DataTable";
import { Button } from "@/shared/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const getStatusBadge = (status) => {
  const statusStyles = {
    sale: "bg-green-100 text-green-700",
    close: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-blue-100 text-blue-700",
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
  { key: "name", title: "Name", sortable: true },
  { key: "project_name", title: "Project Name", sortable: true },
  { key: "platform", title: "Platform", sortable: true },
  { key: "communication", title: "Communication", sortable: true },
  {
    key: "status",
    title: "Status",
    sortable: true,
    render: (value) => getStatusBadge(value),
  },
  { key: "account", title: "Account", sortable: true },
  { key: "rate", title: "Rate", sortable: true },
  { key: "payment_terms", title: "Payment Terms", sortable: true },
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

export default ClientTable;