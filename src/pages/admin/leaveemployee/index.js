import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LeaveEmployeePage from '@/components/leaveEmployee/LeaveEmployeePage';

export default function LeaveEmployeeAdminPage() {
  return (
    <AdminLayout>
      <LeaveEmployeePage role="admin" />
    </AdminLayout>
  );
}