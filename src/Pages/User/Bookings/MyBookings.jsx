import { useEffect, useState } from "react"
import "./MyBookings.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useSocket } from "../../../Socket.js"

export const MyBookings = ({ fetchBookings ,fetchCancelledBookings}) => {
  const cars = useSelector(state => state.carreducers)?.cars
  const bookings = useSelector(state => state.bookingreducers)?.bookings || []
  const MyBookings = [...bookings]?.sort((a, b) => new Date(b.bookingDone) - new Date(a.bookingDone))
  const ongoingBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() > Date.now())
  const previousBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() < Date.now())
  const [showPreviousBookings, setShowPreviousBookings] = useState(false)
  const socket = useSocket()
  const [options, setOptions] = useState([])
  const cancelledBookings=useSelector(state=>state.CancelledBookings.bookings)

  useEffect(() => {
    setOptions(ongoingBookings?.map(b => ({ _id: b._id, val: false })))
  }, [bookings])


  const handleEdit = (id) => {
    setOptions(prev =>
      prev.map(item => item._id === id ? { ...item, val: !item.val } : item)
    );
  }

  const findCar = (carId) => {
    const car = cars.find(c => c._id === carId)
    return car?.carname
  }

  const additionalMessage = (status,id,pickUpDrop) => {
    if (status == "Pending")
      return " Wait for confirmation."
    else if (status === "Accepted")
      return " Complete the payment to book the car."
    else if(status==="Booked")
    {
      if(pickUpDrop===true)
      return " Your Car will be delivered to you."
      else
      return " You have to pick up the car from the location."
    }
    else if(status==="Cancelled")
    {
      const cancelled_booking=cancelledBookings.find(b=>b.bookingId===id)
      if(cancelled_booking?.Refund===true)
      {
        if(cancelled_booking?.RefundStatus==="Pending")
          return " Refund is initiated."
        else if(cancelled_booking?.RefundStatus==="Completed")
          return " Refund is successful."
      }
    }
  }




  const getColor = (status) => {
    if (status === "Pending") return "rgba(240, 230, 140, 0.82)";
    else if (status === "Completed") return "cornflowerblue";
    else if (status === "Accepted") return "green";
    else if (status === "Cancelled") return "red";
    else if (status === "Booked") return "#6f42c1"
  }

  useEffect(() =>{ 
    fetchBookings()
    fetchCancelledBookings()
  },[])

  useEffect(() => {
    const bookingsPage = document.querySelector('.bookings-page')
    const container = document.querySelector('.my-bookings-container')
    if (bookingsPage && container) {
      const containerHeight = container.offsetHeight
      bookingsPage.style.minHeight = '100vh'
      bookingsPage.style.height = containerHeight > window.innerHeight ? `${containerHeight + 80}px` : '100vh'
    }
  }, [ongoingBookings, previousBookings, showPreviousBookings])


  const bookingCancelled = () => {
    fetchBookings()
    fetchCancelledBookings()
  }

  useEffect(() => {
    socket?.current?.on("BookingCancelled", () => bookingCancelled())
  }, [socket.current])

  const cancelBooking = (id,status) => { 
    if(status==="Booked")
    {
      const ans=prompt("If you cancel now,no refund will be initiated.If you want to continue enter Yes else No.")
      if(ans?.toUpperCase()!=="YES")
       return;
    }
    socket?.current?.emit("cancel-booking", { bookingId: id })
    handleEdit(id)
  }

   const refundStatus=(id)=>{
    const cancelled_booking=cancelledBookings.find(b=>b.bookingId===id)
       return cancelled_booking?.RefundStatus
  }


  return (
    <div className="bookings-page">
      <div className="my-bookings-container">
        <h4 className="booking-heading">My Bookings</h4>
        {ongoingBookings.length > 0 ? <div>
          {ongoingBookings?.map((booking, idx) =>
            <div>
              <div className="booking-card" key={booking._id || idx}>
                <p className="booking-title" style={{ marginLeft: "5px", marginTop: "1rem" }}>
                  Your booking for {findCar(booking.carId)} from {new Date(booking.bookingStartDate).toDateString()} to {new Date(booking.bookingEndDate).toDateString()} is {booking.bookingStatus !== "Booked" ? booking.bookingStatus : "Confirmed"}.
                  {additionalMessage(booking.bookingStatus,booking._id,booking.pickUpDrop)}
                </p>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <p style={{ marginLeft: "5px" }}>Total Price: ₹{booking.bookingCharges}</p>
                  {booking.bookingStatus === "Accepted" && <Link to={`/pay/${booking._id}`} className="payment-link">Complete payment</Link>}
                </div>
                <div>
                  {booking.pickUpDrop && 
                  <div>
                    <p style={{ marginLeft: "5px" }}>Pick Up and Drop:  {booking.location}</p>
                  </div>
                  }
                </div>

                <div className="status-and-date">
                  <p style={{ marginLeft: "0.5rem", color: getColor(booking.bookingStatus) }} onClick={()=>handleEdit(booking._id)}>{booking.bookingStatus}</p>
                  <p style={{ marginRight: "0.5rem" }}> {new Date(booking.bookingDone).toDateString()}</p></div>
                <div className="straight-line"></div>
                <div>
                  {options?.find(item => item._id === booking._id && item.val) &&
                    <div>
                      {(booking.bookingStatus === "Pending" || booking.bookingStatus === "Accepted" || booking.bookingStatus === "Booked") &&
                        <div className="booking-options">
                          <p style={{ textAlign: "center" }} onClick={()=>cancelBooking(booking._id,booking.bookingStatus)}>Cancel</p>
                        </div>
                      }
                    </div>
                  }
                </div>

              </div>
            </div>)}</div>
          :
          <p style={{ textAlign: "center", marginTop: "14px" }}>No Bookings</p>}
        {previousBookings.length > 0 &&
          <div>
            <p className="previous-bookings" onClick={() => setShowPreviousBookings(!showPreviousBookings)}>Previous Bookings</p>
            {showPreviousBookings && previousBookings.map((booking, index) => (
              <div>
                <p style={{ marginLeft: "5px", marginTop: "1rem" }}>Car: {findCar(booking?.carId)}</p>
                <p style={{ marginLeft: "5px" }}>
                  Booking Start Date: {new Date(booking.bookingStartDate).toDateString()}
                </p>
                <p style={{ marginLeft: "5px" }}>
                  Booking End Date: {new Date(booking.bookingEndDate).toDateString()}
                </p>
                <p style={{ marginLeft: "5px" }}>
                  Total Price: ₹{booking.bookingCharges}
                </p>
                <div>
                  {booking.pickUpDrop && 
                  <div>
                    <p style={{ marginLeft: "5px" }}>Pick Up and Drop:  {booking.location}</p>
                  </div>
                  }
                </div>
                {booking.bookingStatus==="Cancelled" && <p style={{ marginLeft: "0.5rem" }}>Refund: {refundStatus(booking._id)}</p>}

                <div className="status-and-date">
                  <p style={{ marginLeft: "0.5rem", color: getColor(booking.bookingStatus) }}>{booking.bookingStatus}</p>
                  <p style={{ marginRight: "0.5rem" }}> {new Date(booking.bookingDone).toDateString()}</p></div>
                <div className="straight-line"></div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )
}