import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to login page
    router.push('/login');
  }, [router]);

  return null; // Don't render anything since we're redirecting
}
