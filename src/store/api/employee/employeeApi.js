import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../index';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employee',
    }),
    getEmployee: builder.query({
      query: (id) => `/employee/${id}`,
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: '/employee',
        method: 'POST',
        body: employeeData,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...employeeData }) => ({
        url: `/employee/${id}`,
        method: 'PUT',
        body: employeeData,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;