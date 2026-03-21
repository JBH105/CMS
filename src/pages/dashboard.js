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
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-zinc-900 font-medium text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Modern CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-zinc-50/50 text-zinc-900 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-5">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">User Dashboard</h1>
              <p className="text-sm text-zinc-500 mt-1">Overview of your account and pending items</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200 text-sm font-medium rounded-md shadow-sm transition-all"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 tracking-tight">Welcome, {user?.username}!</h3>
              <p className="text-sm text-zinc-600 font-medium">Role: <span className="text-zinc-900">{user?.role}</span></p>
              <p className="text-sm text-zinc-500 mt-1">{user?.email}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">My Profile</h3>
              <p className="text-sm text-zinc-500">View and update your profile information</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">Leave Management</h3>
              <p className="text-sm text-zinc-500">Apply for leave and check status</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">Company Info</h3>
              <p className="text-sm text-zinc-500">View company information and policies</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}