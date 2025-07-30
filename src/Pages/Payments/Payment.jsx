import "./Payment.css"
import { useSocket } from "../../Socket"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const PaymentPage=()=>{
    const {id}=useParams()
    const socket=useSocket()

    const handlePayment=()=>{
        if(socket?.current?.connected)
            socket.current.emit("paymentDone",{bookingId:id})
    }

    useEffect(()=>{
        socket?.current?.on("BookingDone",()=>console.log("booking done"))
    },[socket.current])
    
    return(
        <div className="Payment-page">
         <button onClick={handlePayment}>pay</button>
        </div>
    )
}