import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/utils/jwtTokens";
import api from "@/utils/api";


export const OnfidoApi = createApi({
      reducerPath: "OnfidoApi",
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
            OnfidoSdkToken: builder.query<any, void>({
                  query: () => {
                        return {
                             url: `/onfido/generate-token`,
                              method: "GET",
                        };
                  },
            }),
            createApplicant: builder.mutation<any, any>({
                  query: ({ data }) => {
                      return {
                          url: `/onfido/create-applicant`,
                          method: "POST",
                          body: data ,
                      };
                  },
            }),
            OnfidoData: builder.query<any, void>({
                  query: () => {
                        return {
                             url: `/onfido/get-onfido-data`,
                              method: "GET",
                        };
                  },
            }),
            OnfidoWorkflowId: builder.query<any, void>({
                  query: () => {
                        return {
                             url: `/onfido/run-workflow`,
                              method: "GET",
                        };
                  },
            }),

      }),
});
export const {
    useOnfidoSdkTokenQuery,
    useCreateApplicantMutation,
    useOnfidoDataQuery,
    useOnfidoWorkflowIdQuery
} = OnfidoApi;
