// import { createSlice } from '@reduxjs/toolkit';
// import { storeLocalData } from '@/utils';

// const initialState = {
//   subTotal: 0,      // for storing the subtotal price
//   buyerPrice: 0,    // for storing the buyer's price
//   escrowPrice: 0,    // for storing the escrow price

// };

// const contractSlice = createSlice({
//   name: 'contract',
//   initialState,
//   reducers: {
//     // Reducer to update the subTotal
//     updateSubTotal: (state, action) => {
//       state.subTotal = action.payload;
//       storeLocalData('contract', JSON.stringify(state));
//     },
//     // Reducer to update the buyerPrice
//     updateBuyerPrice: (state, action) => {
//       state.buyerPrice = action.payload;
//       storeLocalData('contract', JSON.stringify(state));
//     },
//      // Reducer to update the buyerPrice
//      updateEscrowPrice: (state, action) => {
//       state.escrowPrice = action.payload;
//       storeLocalData('contract', JSON.stringify(state));
//     },
//   },
// });

// // Exporting the action creators
// export const { updateSubTotal, updateBuyerPrice, updateEscrowPrice } = contractSlice.actions;

// // Exporting the reducer
// export default contractSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ContractState {
  subTotal: number;
  buyerPrice: number;
  escrowPrice: number;
}

// Define the initial state using the `ContractState` type
const initialState: ContractState = {
  subTotal: 0,
  buyerPrice: 0,
  escrowPrice: 0,
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    // Use PayloadAction to type the action payload
    updateSubTotal: (state, action: PayloadAction<number>) => {
      state.subTotal = action.payload;
    },
    updateBuyerPrice: (state, action: PayloadAction<number>) => {
      state.buyerPrice = action.payload;
    },
    updateEscrowPrice: (state, action: PayloadAction<number>) => {
      state.escrowPrice = action.payload;
    },
  },
});

export const { updateSubTotal, updateBuyerPrice, updateEscrowPrice } = contractSlice.actions;

export default contractSlice.reducer;
