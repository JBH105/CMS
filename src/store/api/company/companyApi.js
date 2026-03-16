import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../index";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery,
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/company?action=allCompanies",
    }),
    getCompany: builder.query({
      query: (id) => `/company/${id}`,
    }),
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "/company?action=createCompany",
        method: "POST",
        body: companyData,
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...companyData }) => ({
        url: `/company/${id}`,
        method: "PUT",
        body: companyData,
      }),
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
