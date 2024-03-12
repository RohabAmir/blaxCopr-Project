import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeLocalData } from '@/utils';

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
