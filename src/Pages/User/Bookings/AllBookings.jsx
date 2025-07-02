import { useEffect,useState } from "react"
import "./AllBookings.css"
import { useSocket } from "../../../Socket.js"
import { useSelector } from "react-redux"

const AllBookings=({fetchBookings})=>{
    const socket=useSocket()

    useEffect(()=>{
       socket?.current?.on("New Booking",(data)=>{
         console.log("New Booking",data)
       })
    },[socket.current])

  const cars = useSelector(state => state.carreducers)?.cars
  const bookings = useSelector(state => state.bookingreducers)?.bookings || []
  const MyBookings = [...bookings]?.sort((a, b) => new Date(b.bookingDone) - new Date(a.bookingDone))
  const ongoingBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() > Date.now())
  const previousBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() < Date.now())
  const [showPreviousBookings, setShowPreviousBookings] = useState(false)
  const allUsers=useSelector(state=>state.UserReducers)?.Users
  console.log(allUsers)

  const findCar = (carId) => {
    const car = cars.find(c => c._id === carId)
    return car?.carname
  }

  useEffect(() => fetchBookings(), [])

  const findUser=(userEmail)=>{
    const user=allUsers?.find(u=>u.email===userEmail)
    console.log(user.name)
    return user
  }

    return(
        <div className="my-bookings-container">
      <h4 className="booking-heading">Bookings</h4>
      {ongoingBookings.length>0 ? <div>
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
              <p>
                Customer: {findUser(booking?.userEmail)?.name}
              </p>
              <p>
                Phone Number: {findUser(booking?.userEmail).phoneNumber}
              </p>
              <p style={{ textAlign: "right" }}> {new Date(booking.bookingDone).toDateString()}</p>
              <div className="straight-line"></div>
          </div>)}</div>
        :
        <p style={{textAlign:"center",marginTop:"14px"}}>No Bookings</p>}
      {previousBookings.length>0 &&
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
                Customer: {findUser(booking?.userEmail).name}
              </p>
              <p>
                Phone Number: {findUser(booking?.userEmail).phoneNumber}
              </p>
              <p style={{ textAlign: "right" }}> {new Date(booking.bookingDone).toDateString()}</p>
              <div className="straight-line"></div>
            </div>
          ))}
        </div>}
    </div>
    )

}

export default AllBookings