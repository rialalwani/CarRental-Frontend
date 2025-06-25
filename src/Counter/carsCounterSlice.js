import { createSlice } from "@reduxjs/toolkit";

export const carsCounterSlice=createSlice({
    name:"cars",
    initialState:{
        cars:[]
    },
    reducers:{
       getallimages:(state,action)=>{
        state.cars=action.payload
       }
    }
})

export const {getallimages}=carsCounterSlice.actions

export default carsCounterSlice.reducer