import { useEffect } from "react"
import "./AllBookings.css"
import { useSocket } from "../../../Socket.js"

const AllBookings=()=>{
    const socket=useSocket()

    useEffect(()=>{
       socket?.current?.on("New Booking",(data)=>{
         console.log("New Booking",data)
       })
    },[socket.current])

    return(
        <div>

        </div>
    )

}

export default AllBookings