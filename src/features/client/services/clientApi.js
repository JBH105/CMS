import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../store/api/index';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery,
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (clientData) => ({
        url: '/client',
        method: 'POST',
        params: { action: 'createClient' },
        body: clientData,
      }),
    }),
    getAllClient: builder.query({
      query: () => ({
        url: '/client',
        params: { action: 'getAllClient' },
      }),
      transformResponse: (response) => response.data || [],
    }),
    singleClientInfo: builder.query({
      query: (id) => ({
        url: '/client',
        params: { action: 'singleClientInfo', id },
      }),
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: '/client',
        method: 'DELETE',
        params: { action: 'deleteClient', id },
      }),
    }),
    updateClientInfo: builder.mutation({
      query: ({ id, ...clientData }) => ({
        url: '/client',
        method: 'PUT',
        params: { action: 'updateClientInfo', id },
        body: clientData,
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetAllClientQuery,
  useSingleClientInfoQuery,
  useDeleteClientMutation,
  useUpdateClientInfoMutation,
} = clientApi;