import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth/authApi';
import { companyApi } from './api/company/companyApi';
import { employeeApi } from './api/employee/employeeApi';
import { hrApi } from './api/hr/hrApi';
import { leaveemployeeApi } from './api/leaveemployee/leaveemployeeApi';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [hrApi.reducerPath]: hrApi.reducer,
    [leaveemployeeApi.reducerPath]: leaveemployeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      companyApi.middleware,
      employeeApi.middleware,
      hrApi.middleware,
      leaveemployeeApi.middleware
    ),
});
