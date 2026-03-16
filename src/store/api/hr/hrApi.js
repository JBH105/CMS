import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../index';

export const hrApi = createApi({
  reducerPath: 'hrApi',
  baseQuery,
  endpoints: (builder) => ({
    getHrData: builder.query({
      query: () => '/hr',
    }),
    // Add more HR-specific endpoints as needed
  }),
});

export const {
  useGetHrDataQuery,
} = hrApi;