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

    getPaymentRecipient: builder.query<any, void>({
      query: () => {
        return {
          url: `/payment/get-recipient`,
          method: "GET",
        };
      },
    }),

    depositData: builder.mutation<any, any>({
      query: ({ id, ...data }) => {
        return {
          url: `/payment/payment-data/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),
    // payment/get-recipient
    addAccount: builder.mutation<any, any>({
      query: (accountData) => {
        return {
          url: `/payment/add-account/`,
          method: "POST",
          body: accountData,
        };
      },
    }),
  }),
});
export const {
  useGetPaymentDataQuery,
  useDepositDataMutation,
  useAddAccountMutation,
  useGetPaymentRecipientQuery,
} = paymentApi;
