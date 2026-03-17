import React from 'react';
import LeaveEmployeePage from '@/features/leaveEmployee/components/LeaveEmployeePage';
import MainLayout from '@/layout/MainLayout/layout';

export default function LeaveEmployeeAdminPage() {
  return (
    <MainLayout>
      <LeaveEmployeePage role='company'/>
    </MainLayout>
  );
}