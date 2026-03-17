import React from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/services/authSlice';
import { useRouter } from 'next/router';

export default function UserDashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Small delay to allow auth state to load
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }
      setIsLoading(false);
      console.log('Dashboard: User authenticated:', user);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Modern CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-blue-50 text-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Welcome, {user?.username}!</h3>
              <p className="text-gray-600">Role: {user?.role}</p>
              <p className="text-gray-600">Email: {user?.email}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">My Profile</h3>
              <p className="text-gray-600">View and update your profile information</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Leave Management</h3>
              <p className="text-gray-600">Apply for leave and check status</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Company Info</h3>
              <p className="text-gray-600">View company information and policies</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}