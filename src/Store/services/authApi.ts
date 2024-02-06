import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "@/utils/jwtTokens";
import api from "@/utils/api";

// Interfaces
interface RegisterUserProps {
      email: string;
      password: string;
}

interface LoginProps {
      email: string;
      password: string;
}

interface ForgetPasswordProps {
      email: string;
}

interface resetPasswordProps {
      password: string;
      token: string;
}
interface updateUserDetailsProps {
      email: string;
      
}

export const authApi = createApi({
      reducerPath: "authApi",
      baseQuery: fetchBaseQuery({
            baseUrl: api,
      }),
      endpoints: (builder) => ({
            registerUser: builder.mutation<any, RegisterUserProps>({
                  query: (userData) => {
                        const payload = {
                              email: userData.email,
                              password: userData.password,
                        };

                        return {
                              url: "/users/signup/",
                              method: "POST",
                              body: payload,
                        };
                  },
            }),

            loginUser: builder.mutation<any, LoginProps>({
                  query: (userData) => {
                        const payload = {
                              email: userData.email,
                              password: userData.password,
                        };

                        return {
                              url: "/auth/login/",
                              method: "POST",
                              body: payload,
                        };
                  },
            }),
            forgetPassword: builder.mutation<any, ForgetPasswordProps>({
                  query: (userData) => {
                        const payload = {
                              email: userData.email,
                        };

                        return {
                              url: "/auth/forget-password/",
                              method: "POST",
                              body: payload,
                        };
                  },
            }),
            resetPassword: builder.mutation<any, resetPasswordProps>({
                  query: (userData) => {
                        const payload = {
                              password: userData.password,
                        };
                        const headers = userData.token
                              ? { Authorization: `Bearer ${userData.token}` }
                              : {};
                        return {
                              url: "/auth/reset-password/",
                              method: "POST",
                              body: payload,
                              headers: headers,
                        };
                  },
            }),
            getUserDetails: builder.query<any, void>({
                  query: () => {
                        const token = getAccessToken(); // Retrieve token from cookies
                        return {
                              url: "/users/me/",
                              method: "GET",
                              headers: token
                                    ? { Authorization: `Bearer ${token}` }
                                    : {},
                        };
                  },
            }),
            updateUserDetails: builder.mutation<any, updateUserDetailsProps>({
                  query: (userData) => {
                        const payload = {
                              email: userData.email,
                        };
                        const token = getAccessToken(); 

                        return {
                              url: "/users/update/",
                              method: "PATCH",
                              body: payload,
                              headers: token
                              ? { Authorization: `Bearer ${token}` }
                              : {},
                        };
                  },
            }),
      }),
});
export const {
      useRegisterUserMutation,
      useLoginUserMutation,
      useForgetPasswordMutation,
      useResetPasswordMutation,
      useGetUserDetailsQuery,
      useUpdateUserDetailsMutation
} = authApi;
