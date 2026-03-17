// src/components/employee/EmployeeTable.jsx
"use client";

import React from 'react';
import DataTable from '@/shared/Table/DataTable';
import { Button } from '@/shared/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

const dummyEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    joiningDate: '2025-12-01',
    currentSalary: 30000,
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543222',
    joiningDate: '2026-01-15',
    currentSalary: 32000,
    status: 'active'
  },
  {
    id: 3,
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '9876543233',
    joiningDate: '2026-02-10',
    currentSalary: 31000,
    status: 'on-leave'
  },
  {
    id: 4,
    name: 'Bob Lee',
    email: 'bob@example.com',
    phone: '9876543244',
    joiningDate: '2026-03-01',
    currentSalary: 30500,
    status: 'active'
  },
  {
    id: 5,
    name: 'Sara White',
    email: 'sara@example.com',
    phone: '9876543255',
    joiningDate: '2026-03-10',
    currentSalary: 33000,
    status: 'active'
  },
];

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

const getStatusBadge = (status) => {
  const statusStyles = {
    'active': 'bg-green-100 text-green-700',
    'on-leave': 'bg-yellow-100 text-yellow-700',
    'inactive': 'bg-gray-100 text-gray-700',
    'terminated': 'bg-red-100 text-red-700'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ') : 'Unknown'}
    </span>
  );
};

const columns = [
  { 
    key: 'name', 
    label: 'Name',
    sortable: true
  },
  { 
    key: 'email', 
    label: 'Email',
    sortable: true
  },
  { 
    key: 'phone', 
    label: 'Phone' 
  },
  { 
    key: 'joiningDate', 
    label: 'Joining Date',
    render: (value) => formatDate(value),
    sortable: true
  },
  { 
    key: 'currentSalary', 
    label: 'Current Salary',
    render: (value) => formatCurrency(value),
    sortable: true
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => getStatusBadge(value),
    sortable: true
  },
  { 
    key: 'actions', 
    label: 'Actions' 
  },
];

const EmployeeTable = () => {
  const handleEdit = (row) => {
    console.log('Edit employee:', row);
    // Add edit logic here
  };

  const handleDelete = (row) => {
    console.log('Delete employee:', row);
    // Add delete logic here
  };

  return (
    <DataTable
      data={dummyEmployees}
      columns={columns}
      showActions={true}
      actions={(row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2"
            title="Delete"
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