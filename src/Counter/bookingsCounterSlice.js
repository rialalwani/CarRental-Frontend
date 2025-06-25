import { createSlice } from "@reduxjs/toolkit";

const bookingsCounterSlice=createSlice({
    name:"Bookings",
    initialState:{
        bookings:null
    },
    reducers:{
        getMyBookings:(state,action)=>{
          state.bookings=action.payload
        }
    }
})

export const {getMyBookings}=bookingsCounterSlice.actions

export default bookingsCounterSlice.reducer