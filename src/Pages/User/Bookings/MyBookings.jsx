import { useEffect, useState } from "react"
import "./MyBookings.css"
import { useSelector } from "react-redux"

export const MyBookings = ({ fetchBookings }) => {
  const cars = useSelector(state => state.carreducers)?.cars
  const bookings = useSelector(state => state.bookingreducers)?.bookings || []
  const MyBookings = [...bookings]?.sort((a, b) => new Date(b.bookingDone) - new Date(a.bookingDone))
  const ongoingBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() > Date.now())
  const previousBookings = MyBookings?.filter(b => new Date(b.bookingEndDate).getTime() < Date.now())
  const [showPreviousBookings, setShowPreviousBookings] = useState(false)
  //console.log(ongoingBookings)

  const findCar = (carId) => {
    const car = cars.find(c => c._id === carId)
    return car?.carname
  }

  useEffect(() => fetchBookings(), [])

  


  return (
    <div className="my-bookings-container">
      <h4 className="booking-heading">My Bookings</h4>
      {ongoingBookings.length>0 ? <div>
        {ongoingBookings?.map((booking, idx) =>
          <div>
            <div className="booking-card" key={booking._id || idx}>
              <p className="booking-title" style={{ marginLeft: "5px" }}>
                Your booking for {findCar(booking.carId)} is confirmed from {new Date(booking.bookingStartDate).toDateString()} to {new Date(booking.bookingEndDate).toDateString()}.
              </p>
              <p style={{ marginLeft: "5px" }}>Total Price: ₹{booking.bookingCharges}</p>
              <p style={{ textAlign: "right" }}> {new Date(booking.bookingDone).toDateString()}</p>
              <div className="straight-line"></div>
            </div>
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
                Total Price: ₹{booking.bookingCharges}
              </p>
              <p style={{ textAlign: "right" }}> {new Date(booking.bookingDone).toDateString()}</p>
              <div className="straight-line"></div>
            </div>
          ))}
        </div>}
    </div>
  )
}