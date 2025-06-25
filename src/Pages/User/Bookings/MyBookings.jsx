import { useEffect } from "react"
import "./MyBookings.css"
import {getUserBookings} from "../../../API/api.js"
import { useDispatch,useSelector } from "react-redux"
import {getMyBookings} from "../../../Counter/bookingsCounterSlice.js"

export const MyBookings=()=>{
    const dispatch=useDispatch()
    const bookings=useSelector(state=>state.bookingreducers)?.bookings

    useEffect(()=>{
      getUserBookings()
      .then(result=>{
        dispatch(getMyBookings(result.data))
      })
      .catch(error=>
      {
        console.log(error.message)
      })
    },[])


    return(
        <div>
          
        </div>
    )
}