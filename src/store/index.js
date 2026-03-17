import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/services/authApi';
import { companyApi } from '../features/companies/services/companyApi';
import { employeeApi } from '../features/employee/services/employeeApi';
import { hrApi } from './api/hr/hrApi';
import { leaveemployeeApi } from '../features/leaveEmployee/services/leaveemployeeApi';
import authSlice from '../features/auth/services/authSlice';

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
