import { configureStore } from '@reduxjs/toolkit'
import reducers from '../Counter/counterslice'
import carreducers from "../Counter/carsCounterSlice"
import bookingreducers from "../Counter/bookingsCounterSlice"
import UsersReducers from "../Counter/UsersCounterSlice"
import CancelledBookings from "../Counter/cancelledBookingsSlice"

export const store=configureStore({
    reducer:{
        userreducer:reducers,
        carreducers:carreducers,
        bookingreducers:bookingreducers,
        UserReducers: UsersReducers,
        CancelledBookings:CancelledBookings
    }
})