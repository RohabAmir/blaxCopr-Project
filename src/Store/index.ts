"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { contractApi } from "./services/contractApi";
import { paymentApi } from "./services/paymentApi";
import  authReducer  from './services/authSlice';
import contractReducer from "./services/contractSlice"
import { getLocalData, storeLocalData } from "@/utils";

// Attempt to load the initial state for 'contract' from local storage
const loadInitialState = () => {
      try {
        const storedData = getLocalData('contract');
        return storedData ? JSON.parse(storedData) : {};
      } catch (error) {
        console.error('Error loading state from local storage:', error);
        return {};
      }
    };
    
    const preloadedState = {
      contract: loadInitialState()
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contract: contractReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      contractApi.middleware,
      paymentApi.middleware
    ),
});


// You might want to add a listener to save the state to local storage whenever it changes
store.subscribe(() => {
      const state = store.getState();
      storeLocalData('contract', JSON.stringify(state.contract));
});

// Define a type for the root state
export type RootState = ReturnType<typeof store.getState>;

export default store;
