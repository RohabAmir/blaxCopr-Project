"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { contractApi } from "./services/contractApi";
import { paymentApi } from "./services/paymentApi";
import { OnfidoApi } from "./services/onfidoApi";
import contractReducer from "./services/contractSlice"


export const store = configureStore({
  reducer: {
    contract: contractReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [OnfidoApi.reducerPath]: OnfidoApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      contractApi.middleware,
      paymentApi.middleware,
      OnfidoApi.middleware,

    ),
});



export default store;
