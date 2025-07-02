import "./CarBook.css"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import CardLink from "react-bootstrap/esm/CardLink.js"
import Card from "react-bootstrap/Card"
import { io } from "socket.io-client"
import { useSocket } from "../../Socket.js"
import { useState, useEffect, useRef } from "react"

const BookCar = ({fetchBookings}) => {
    const { id } = useParams()
    const cars = useSelector(state => state.carreducers).cars
    const car = cars?.find(car => car._id === id)
    const [startingDate, setStartingDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const today = new Date().toISOString().split("T")[0];
    const user = useSelector(state => state.userreducer)
    const [bookingDone, setBookingDone] = useState(false)
    const socket = useSocket()
    const navigate=useNavigate()

   

    const bookCar = () => {
        if (!user?.email)
            alert('Please sign up to book a car')
        if (!startingDate && !endDate)
            alert("Enter booking date")

        const diff = new Date(endDate) - new Date(startingDate)
        const days = diff / (1000 * 60 * 60 * 24)
        const bookingCharges=days*car?.price
        console.log(bookingCharges)

        const bookingDetails = {
            userEmail: user?.email,
            carId: id,
            bookingStartDate: startingDate,
            bookingEndDate: endDate,
            bookingCharges: bookingCharges
        }

        console.log("Socket status:", socket?.connected);
        socket?.current?.emit("booking", bookingDetails)
    }




    useEffect(() => {

            socket?.current?.on("bookingCompleted", (response) => {
            console.log("Booking Done")
            fetchBookings()
            navigate("/mybookings")
           })
        },[socket.current])

    return (
        <div>
            <div>
                {bookingDone ?
                    <div className="booking-page">
                        <p>Booking Done. Your Car will be delivered</p>
                        <p>{car?.carname}-{car?.cardesc} booked for {startingDate} to {endDate}</p>
                    </div>
                    :
                    <Card style={{ width: '20rem' }} className="booking-page">
                        <Card.Img variant="top" src={car?.url} style={{ height: "10rem", width: "20rem" }} />
                        <Card.Body>
                            <Card.Title>{car?.carname}</Card.Title>
                            <Card.Text>
                                {car?.cardesc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>Price:{car?.price} per day</Card.Body>
                        <div className="car-form-div">
                            <div className="starting-date-div">
                                <label>From:</label>
                                <input type="date" min={today} max={
                                    endDate ? new Date(new Date(endDate).getTime()-(24*3600*1000)).toISOString()
          .split("T")[0]
                                    :
                                    ""
                                   }
                                    onChange={e => {
                                        setStartingDate(e.target.value)
                                    }}></input>
                            </div>
                            <div className="ending-date-div">
                                <label>To:</label>
                                <input type="date" onChange={e => setEndDate(e.target.value)} min={
                                    (startingDate
                                        ?
                                     new Date(new Date(startingDate).getTime()+24*3600*1000).toISOString()
          .split("T")[0]
                                    :today
                                    )}>
                                </input>
                            </div>
                            <button className="book-car-btn" onClick={bookCar}>Book</button>
                        </div>
                    </Card>
                }
            </div>
        </div>
    )
}

export default BookCar
