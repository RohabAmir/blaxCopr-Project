"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { contractApi } from "./services/contractApi";
import  authReducer  from './services/authSlice';

export const store = configureStore({
      reducer: {
            auth: authReducer,
            [authApi.reducerPath]: authApi.reducer,
            [contractApi.reducerPath]: contractApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware,contractApi.middleware),
});

export default store;
