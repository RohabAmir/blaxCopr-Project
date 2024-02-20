import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/utils/jwtTokens";

import api from "@/utils/api";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaymentData: builder.query<any, any>({
      query: (id) => `/payment/payment-data/${id}`,
    }),
    depositData: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, ...data }) => ({
        url: `/payment/payment-data/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPaymentDataQuery, useDepositDataMutation } = paymentApi;
