import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './api/auth/authApi';

// Helper functions for localStorage
const loadFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('authToken');
      const userString = localStorage.getItem('authUser');
      
      // Check if userString is valid JSON and not "undefined"
      let user = null;
      if (userString && userString !== 'undefined' && userString !== 'null') {
        user = JSON.parse(userString);
      }
      
      return {
        token: token && token !== 'undefined' ? token : null,
        user,
        isAuthenticated: !!(token && token !== 'undefined' && user),
      };
    } catch (error) {
      // If parsing fails, clear corrupted data
      console.warn('Error loading auth data from localStorage:', error);
      clearStorage();
      return { token: null, user: null, isAuthenticated: false };
    }
  }
  return { token: null, user: null, isAuthenticated: false };
};

const saveToStorage = (token, user) => {
  if (typeof window !== 'undefined' && token && user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
  }
};

const clearStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }
};

const initialState = loadFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      clearStorage();
    },
    loadAuthFromStorage: (state) => {
      const stored = loadFromStorage();
      state.token = stored.token;
      state.user = stored.user;
      state.isAuthenticated = stored.isAuthenticated;
    },
    setAuthData: (state, action) => {
      const { token, user } = action.payload;
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        saveToStorage(token, user);
      } else {
        console.error('setAuthData: Invalid token or user data', { token, user });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          clearStorage();
        }
      );
  },
});

export const { logout, loadAuthFromStorage, setAuthData } = authSlice.actions;
export default authSlice.reducer;