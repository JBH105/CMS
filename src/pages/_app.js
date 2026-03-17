import "@/styles/globals.css";
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { loadAuthFromStorage } from '@/features/auth/services/authSlice';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load auth state from localStorage on app start
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Toaster position="top-right" richColors />
        <Component {...pageProps} />
      </AuthInitializer>
    </Provider>
  );
}
  