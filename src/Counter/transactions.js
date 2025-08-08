import {createSlice} from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
    },
    reducers:{
        getTransactions:(state,action)=>{
            state.transactions = action.payload;
        }
    }
})

export const { getTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;