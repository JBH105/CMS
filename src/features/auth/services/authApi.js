import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../store/api/index';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        params: { action: 'login' },
        body: credentials,
      }),
      transformResponse: (response) => {
        return response.data || response;
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth',
        method: 'POST',
        params: { action: 'register' },
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth',
        method: 'POST',
        params: { action: 'logout' },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/auth',
        params: { action: 'profile' },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;