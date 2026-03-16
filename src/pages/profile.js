import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile | Modern CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <p className="text-gray-900 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}