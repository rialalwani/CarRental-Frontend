import { createSlice } from "@reduxjs/toolkit";

const cancelledBookings=createSlice({
    name:"Cancelled-Bookings",
    initialState:{
        bookings:[]
    },
    reducers:{
        getMyCancelledBookings:(state,action)=>{
            state.bookings=action.payload
        }
    }
})

export const {getMyCancelledBookings}=cancelledBookings.actions

export default cancelledBookings.reducer