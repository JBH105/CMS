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
        <Toaster 
          position="top-right" 
          toastOptions={{
            classNames: {
              toast: 'bg-white border border-zinc-200 text-zinc-900 shadow-xl shadow-black/5 rounded-lg p-4 font-sans',
              title: 'text-sm font-semibold tracking-tight',
              description: 'text-zinc-500 text-sm',
              actionButton: 'bg-zinc-900 text-white border-0 hover:bg-zinc-800',
              cancelButton: 'bg-zinc-100 text-zinc-600 border-0 hover:bg-zinc-200',
              success: 'border-l-4 border-l-zinc-900',
              error: 'border-l-4 border-l-rose-500',
              warning: 'border-l-4 border-l-yellow-500',
              info: 'border-l-4 border-l-blue-500',
            }
          }}
        />
        <Component {...pageProps} />
      </AuthInitializer>
    </Provider>
  );
}
  