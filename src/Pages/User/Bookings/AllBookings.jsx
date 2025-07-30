import { useEffect, useState } from "react"
import "./AllBookings.css"
import { useSelector } from "react-redux"
import { useSocket } from "../../../Socket"

const AllBookings = ({ fetchAllBookings ,fetchAllCancelledBookings}) => {

  
  const socket=useSocket()
  const cars = useSelector(state => state.carreducers)?.cars
  const bookings = useSelector(state => state.bookingreducers)?.bookings || []
  const MyBookings = [...bookings]?.sort((a, b) => new Date(b.bookingDone) - new Date(a.bookingDone))
  const ongoingBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() > Date.now())
  const previousBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() < Date.now())
  const [showPreviousBookings, setShowPreviousBookings] = useState(false)
  const allUsers = useSelector(state => state.UserReducers)?.Users
  const [options,setOptions]=useState([])
  const cancelledBookings = useSelector(state => state.CancelledBookings.bookings)

  useEffect(()=>{
    setOptions(ongoingBookings?.map(b=>({_id:b._id,val:false})))
  },[bookings])


  const handleEdit = (id) => {
    setOptions(prev =>
      prev.map(item => item._id === id ? { ...item, val: !item.val } : item )
    );
  }

  const findCar = (carId) => {
    const car = cars.find(c => c._id === carId)
    return car?.carname
  }

const getColor=(status)=>{
   if(status === "Pending") return "rgba(240, 230, 140, 0.82)";
   else if (status === "Completed") return "cornflowerblue";
   else if (status === "Accepted") return "green";
   else if (status === "Cancelled") return "red";
   else if(status==="Booked") return "#6f42c1"
}


  useEffect(() => {
    fetchAllBookings()
    fetchAllCancelledBookings()
  },[])

  const findUser = (userEmail) => {
    const user = allUsers?.find(u => u.email === userEmail)
    //console.log(user.name)
    return user
  }


  // This effect ensures .bookings-page is at least 100vh, but grows if content is taller
  useEffect(() => {
    const bookingsPage = document.querySelector('.bookings-page')
    const container = document.querySelector('.my-bookings-container')
    if (bookingsPage && container) {
      const containerHeight = container.offsetHeight
      bookingsPage.style.minHeight = '100vh'
      bookingsPage.style.height = containerHeight > window.innerHeight ? `${containerHeight+80}px` : '100vh'
    }
  }, [ongoingBookings, previousBookings, showPreviousBookings])


  const acceptBooking=(id)=>{
    handleEdit(id)
    socket?.current?.emit("booking-accept",{bookingId:id})
  }

  const bookingAccepted=()=>{
    fetchAllBookings()
    console.log("working")
  }

  const bookingCancelled=()=>{
    fetchAllBookings()
    fetchAllCancelledBookings()
  }
  
  useEffect(()=>{
    socket?.current?.on("booking-accept",(data)=>bookingAccepted())
    socket?.current?.on("BookingCancelled",(data)=>bookingCancelled())
  },[socket.current])

  const cancelBooking=(id)=>{
    socket?.current?.emit("cancel-booking",{bookingId:id})
    handleEdit(id)
  }

  const refundStatus=(id)=>{
    const cancelled_booking=cancelledBookings.find(b=>b.bookingId===id)
       return cancelled_booking?.RefundStatus
  }


  return (
    <div className="bookings-page">
      <div className="my-bookings-container">
        <h4 className="booking-heading">Bookings</h4>
        {ongoingBookings.length > 0 ? <div>
          {ongoingBookings?.map((booking, idx) =>
            <div>
              <p style={{ marginLeft: "5px" }}>Car: {findCar(booking?.carId)}</p>
              <p style={{ marginLeft: "5px" }}>
                Booking Start Date: {new Date(booking.bookingStartDate).toDateString()}
              </p>
              <p style={{ marginLeft: "5px" }}>
                Booking End Date: {new Date(booking.bookingEndDate).toDateString()}
              </p>
              <p style={{ marginLeft: "5px" }}>
                Total Earnings: ₹{booking.bookingCharges}
              </p>
              <p style={{ marginLeft: "5px" }}>
                Customer: {findUser(booking?.userEmail)?.name}
              </p>
              <p style={{ marginLeft: "5px" }}>
                Phone Number: {findUser(booking?.userEmail)?.phoneNumber}
              </p>
              <div>
                  {booking.pickUpDrop && 
                  <div>
                    <p style={{ marginLeft: "5px" }}>Pick Up and Drop:  {booking.location}</p>
                  </div>
                  }
              </div>
               {booking.bookingStatus==="Cancelled" && <p>Refund: {refundStatus(booking._id)}</p>}
              <div className="status-and-date">
                <p style={{marginLeft:"0.5rem",color:getColor(booking.bookingStatus)}} onClick={()=>handleEdit(booking._id)}>{booking.bookingStatus}</p>
                <p style={{marginRight:"0.5rem"}}> {new Date(booking.bookingDone).toDateString()}</p>
              </div>
              <div className="straight-line"></div>
               {options?.find(item=>item._id===booking._id && item.val) &&
              <div>
              {booking.bookingStatus==="Pending"?
              <div className="booking-options">
                <p style={{textAlign:"center"}} onClick={()=>acceptBooking(booking._id)}>Accept</p>
                <p style={{textAlign:"center"}} onClick={()=>cancelBooking(booking._id)}>Cancel</p>
              </div>
               :
               <div className="booking-options"><p style={{textAlign:"center"}} onClick={()=>cancelBooking(booking._id)}>Cancel</p></div>
               }
               </div>}
            </div>)}</div>
          :
          <div>{!showPreviousBookings && <p style={{ textAlign: "center", marginTop: "14px" }}>No Bookings</p>}</div>}
        {previousBookings.length > 0 &&
          <div>
            <p className="previous-bookings" onClick={() => setShowPreviousBookings(!showPreviousBookings)}>Previous Bookings</p>
            {showPreviousBookings && previousBookings.map((booking, index) => (
              <div>
                <p style={{ marginLeft: "5px" }}>Car: {findCar(booking?.carId)}</p>
                <p style={{ marginLeft: "5px" }}>
                  Booking Start Date: {new Date(booking.bookingStartDate).toDateString()}
                </p>
                <p style={{ marginLeft: "5px" }}>
                  Booking End Date: {new Date(booking.bookingEndDate).toDateString()}
                </p>
                <p style={{ marginLeft: "5px" }}>
                  Total Earnings: ₹{booking.bookingCharges}
                </p>
                <p>
                  Customer: {findUser(booking?.userEmail)?.name}
                </p>
                <p>
                  Phone Number: {findUser(booking?.userEmail)?.phoneNumber}
                </p>
                {booking.bookingStatus==="Cancelled" && <p>Refund: {refundStatus(booking._id)}</p>}
                <div className="status-and-date">
                <p style={{marginLeft:"0.5rem",color:getColor(booking.bookingStatus)}}>{booking.bookingStatus}</p>
                <p style={{marginRight:"0.5rem"}}> {new Date(booking.bookingDone).toDateString()}</p></div>
                <div className="straight-line"></div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )

}

export default AllBookings