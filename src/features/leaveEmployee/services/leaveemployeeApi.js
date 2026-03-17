import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../store/api/index";

export const leaveemployeeApi = createApi({
  reducerPath: "leaveemployeeApi",
  baseQuery,
  endpoints: (builder) => ({
    getEmployeeLeaves: builder.query({
      query: () => ({
        url: "/employee",
        params: {
          action: "getLeave",
        },
      }),
    }),
    createLeaveRequest: builder.mutation({
      query: (leaveData) => ({
        url: "/employee/leave",
        method: "POST",
        body: leaveData,
      }),
    }),
    updateLeaveRequest: builder.mutation({
      query: ({ id, ...leaveData }) => ({
        url: `/employee/leave/${id}`,
        method: "PUT",
        body: leaveData,
      }),
    }),
    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `/employee/leave/${id}`,
        method: "DELETE",
      }),
    }),
    approveLeaveRequest: builder.mutation({
      query: (id) => ({
        url: "/employee",
        method: "PUT",
        params: {
          action: "approveLeave",
          id: id,
        },
      }),
    }),
    rejectLeaveRequest: builder.mutation({
      query: (id) => ({
        url: "/employee",
        method: "PUT",
        params: {
          action: "rejectLeave",
          id: id,
        },
      }),
    }),
  }),
});

export const {
  useGetEmployeeLeavesQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation,
} = leaveemployeeApi;
