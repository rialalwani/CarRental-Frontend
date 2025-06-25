import { configureStore } from '@reduxjs/toolkit'
import reducers from '../Counter/counterslice'
import carreducers from "../Counter/carsCounterSlice"
import bookingreducers from "../Counter/bookingsCounterSlice"

export const store=configureStore({
    reducer:{
        userreducer:reducers,
        carreducers:carreducers,
        boookingreducers:bookingreducers
    }
})