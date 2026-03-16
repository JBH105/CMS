import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Companies from '@/components/admin/companies/Companies';

export default function CompaniesPage() {
  return (
    <AdminLayout>
      <Companies />
    </AdminLayout>
  );
}