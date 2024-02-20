import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/utils/jwtTokens";
import api from "@/utils/api";



interface sendInviteProps{
      email: string;
      message: string;
      role:string;
      id: number;
}
export const contractApi = createApi({
      reducerPath: "contractApi",
      baseQuery: fetchBaseQuery({
            baseUrl: api,
            prepareHeaders: (headers, { getState }) => {
                  // Automatically add the Authorization header to all requests if the token exists
                  const token = getAccessToken();
                  if (token) {
                        headers.set("Authorization", `Bearer ${token}`);
                  }
                  return headers;
            },
      }),
      endpoints: (builder) => ({
            PostContractDetails: builder.mutation<any, any>({
                  query: (contractData) => {
                        return {
                              url: "/contracts/create/",
                              method: "POST",
                              body: contractData,
                        };
                  },
            }),
            UpdateContractDetails: builder.mutation<any, any>({
                  query: ({ id,...contractData }) => {

                      return {
                          url: `/contracts/update/${id}`,
                          method: "PATCH",
                          body: contractData,
                      };
                  },
            }),
            FetchContractDetails: builder.query<any, any>({
                  query: (id) => {
                        return {
                             url: `/contracts/fetch/${id}`,
                              method: "GET",
                        };
                  },
            }),
            SendInvite: builder.mutation<any, any>({
                  query: ({ id ,...data }) => {

                      return {
                          url: `/contracts/send-invite/${id}`,
                          method: "POST",
                          body: data ,
                      };
                  },
            }),
            CompleteContractDetails: builder.mutation<any, any>({
                  query: ({ id ,...contractData}) => {

                      return {
                          url: `/contracts/complete/${id}`,
                          method: "POST",
                          body: contractData ,
                      };
                  },
            }),
            getAllContractDetails: builder.query<any, void>({
                  query: () => {
                        return {
                             url: `/contracts/get-all`,
                              method: "GET",
                        };
                  },
            }),
            deleteContract: builder.mutation<any, any>({
                  query: (id) => {
                        return {
                             url: `/contracts/delete/${id}`,
                              method: "DELETE",
                        };
                  },
            }),
      }),
});

export const {
      usePostContractDetailsMutation,
      useUpdateContractDetailsMutation,
      useFetchContractDetailsQuery,
      useSendInviteMutation,
      useGetAllContractDetailsQuery,
      useDeleteContractMutation,
      useCompleteContractDetailsMutation
} = contractApi;
