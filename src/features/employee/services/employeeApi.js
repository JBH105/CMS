import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../store/api/index';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery,
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employee?action=getAllEmployee',
      providesTags: ['Employee'],
    }),
    getEmployee: builder.query({
      query: (id) => `/employee/${id}`,
      providesTags: ['Employee'],
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: '/employee?action=createEmployee',
        method: 'POST',
        body: employeeData,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...employeeData }) => ({
        url: `/employee?action=updateEmployee&id=${id}`,
        method: 'PUT',
        body: employeeData,
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
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