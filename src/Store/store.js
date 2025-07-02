import { configureStore } from '@reduxjs/toolkit'
import reducers from '../Counter/counterslice'
import carreducers from "../Counter/carsCounterSlice"
import bookingreducers from "../Counter/bookingsCounterSlice"
import UsersReducers from "../Counter/UsersCounterSlice"

export const store=configureStore({
    reducer:{
        userreducer:reducers,
        carreducers:carreducers,
        bookingreducers:bookingreducers,
        UserReducers: UsersReducers
    }
})