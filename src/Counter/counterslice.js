import { createSlice } from "@reduxjs/toolkit";
import { getUserRole } from "../Role/Role.js";

export const counterslice = createSlice({
    name: "user",
    initialState: {
        email: JSON.parse(localStorage.getItem('user'))?.email,
        name: JSON.parse(localStorage.getItem('user'))?.name,
        role:localStorage.getItem('role')
        //error:null
    },
    reducers: {
        verifyotp: (state, action) => {
            //console.log(action.payload)
            state.email=action.payload.user.email
            state.name=action.payload.user.name
            
            localStorage.setItem("token",action.payload.token) 
            localStorage.setItem("user",JSON.stringify(action.payload.user)) 
            localStorage.setItem("role",getUserRole())

             state.role=getUserRole("role")
        },
        log_in: (state, action) => {
            //console.log(action.payload)
            state.email=action.payload.user.email
            state.name=action.payload.user.name
    
            localStorage.setItem("token",action.payload.token)
            localStorage.setItem("user",JSON.stringify(action.payload.user))
            localStorage.setItem("role",getUserRole())

             state.role=getUserRole("role")
        },
        log_out:(state)=>{
            state.email=null
            state.name=null
            state.role=null

            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("role")
        }
    }
})

export const { verifyotp, log_in,log_out } = counterslice.actions

export default counterslice.reducer