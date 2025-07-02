import {createSlice} from "@reduxjs/toolkit"

export const UsersCounterSlice=createSlice({
    name:"Users",
    initialState:{
        Users:null
    },
    reducers:{
        allUsers:(state,action)=>{
            state.Users=action.payload
        }
    }
})

export const {allUsers}=UsersCounterSlice.actions
export default UsersCounterSlice.reducer