import "./CarBook.css"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Card from "react-bootstrap/Card"
import { useSocket } from "../../Socket.js"
import { useState, useEffect } from "react"
import { sendDocs } from "../../API/api.js"

const BookCar = ({ fetchBookings }) => {
    const { id } = useParams()
    const cars = useSelector(state => state.carreducers).cars
    const car = cars?.find(car => car._id === id)
    const [startingDate, setStartingDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    const user = useSelector(state => state.userreducer)
    const [bookingDone, setBookingDone] = useState(false)
    const socket = useSocket()
    const navigate = useNavigate()
    const [adhaar, setAdhaar] = useState(null)
    const [dl, setdl] = useState(null)
    const [location,setLocation]=useState(null)
    const [inputLocation,setInputLocation]=useState(false)

    const handleDateChange = (e) => {
        const date = e.target.value;
        if (!date)
            return;
        const now = new Date()
        const [year, month, day] = date.split("-").map(Number)
        const newDate = new Date(
            year,
            month - 1,
            day,
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
        )
        return newDate;
    }



    const bookCar = async () => {
        if (!user?.email)
            alert('Please sign up to book a car')
        else if (!startingDate && !endDate)
            alert("Enter booking date")
        else if (!adhaar)
            alert("Upload Your Adhaar")
        else if (!dl)
            alert("Upload Your Driving License")

        const diff = new Date(endDate) - new Date(startingDate)
        const days = parseInt(diff / (1000 * 60 * 60 * 24))
        let bookingCharges = (days * car?.price) + 5000 //security deposit refundable
        if(inputLocation && location)
            bookingCharges=bookingCharges+500//pick up drop
        
        //console.log(bookingCharges)



        const bookingDetails = {
            userEmail: user?.email,
            carId: id,
            bookingStartDate: new Date(startingDate),
            bookingEndDate: new Date(endDate),
            bookingCharges,
            bookingStatus: "Pending",
            pickUpDrop:inputLocation,
            location:location
        };

        /*const toBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });
        };*/

        //const adhaarBase64 = await toBase64(adhaar);
        //const dlBase64 = await toBase64(dl);
        const data = new FormData()
        data.append("aadhaar", adhaar)
        data.append("dl", dl)
        data.append("bookingDetails", JSON.stringify(bookingDetails))



        //console.log("Socket id:", socket?.current);
        socket?.current?.emit("booking-req", bookingDetails)
        //console.log("Socket id:", socket?.current);

        try {
            //console.log(data)
            await sendDocs(data)
        }
        catch (error) {
            //console.log("Something went wrong")
        }

        //console.log("booking event is emitted")



    }




    useEffect(() => {

        socket?.current?.on("bookingPending", (response) => {
            //console.log("Booking Request made")
            fetchBookings()
            navigate("/mybookings")
        })



    }, [socket.current])

    return (
        <div>
            <div className="booking-page-div">
                {bookingDone ?
                    <div className="booking-page">
                        <p>Booking Done. Your Car will be delivered</p>
                        <p>{car?.carname}-{car?.cardesc} booked for {startingDate} to {endDate}</p>
                    </div>
                    :
                    <Card style={{ width: '20rem' }} className="booking-page">
                        <Card.Img variant="top" src={car?.url} style={{ height: "10rem", width: "20rem", marginTop: "1rem" }} />
                        <Card.Body>
                            <Card.Title>{car?.carname}</Card.Title>
                            <Card.Text>
                                {car?.cardesc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <p>Price:  {car?.price} per day +5000</p>
                            <p style={{color:"GrayText"}}>(5000 Security deposit Refundable)</p>
                        </Card.Body>
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
                                        setStartingDate(handleDateChange(e))
                                    }}
                                ></input>
                            </div>
                            <div className="ending-date-div">
                                <label>To:</label>
                                <input type="date" onChange={e => setEndDate(handleDateChange(e))} min={
                                    (startingDate
                                        ?
                                        new Date(new Date(startingDate).getTime()+(24*3600*1000)).toISOString()
                                            .split("T")[0]
                                        :
                                        today
                                    )}
                                >
                                </input>
                            </div>
                            <div className="adhaar-div" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginLeft: "1rem" }}>
                                <label>Upload Your Adhaar</label>
                                <input type="file" id="adhaar-input" accept=".pdf,.png,.jpg,.jpeg" onChange={e => setAdhaar(e.target.files[0])} style={{ display: "none" }}></input>
                                <label htmlFor="adhaar-input"
                                    style={{ backgroundColor: "#fff", color: "black", padding: "0.3rem", borderRadius: "5px", width: "fit-content" }}>
                                    {adhaar?.name || "Choose File"}
                                </label>
                            </div>
                            <div className="dl-div" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginLeft: "1rem" }}>
                                <label>Upload Your Driving License</label>
                                <input type="file" id="dl-input" accept=".pdf,.png,.jpg,.jpeg" onChange={e => setdl(e.target.files[0])} style={{ display: "none" }}></input>
                                <label htmlFor="dl-input"
                                    style={{ backgroundColor: "#fff", color: "black", padding: "0.3rem", borderRadius: "5px", width: "fit-content" }}>
                                    {dl?.name || "Choose File"}
                                </label>
                            </div>
                            <div style={{display:"flex",marginLeft:"1.5rem",gap:"0.2rem"}}>
                                <input type="checkbox" name="pickup" onChange={()=>setInputLocation(!inputLocation)}/>
                                <label>Do you want pick up drop service?</label>
                            </div>
                            <p style={{textAlign:"center",color:"grey"}}>(Charges for pick up drop is 500)</p>
                            {inputLocation && 
                            <div style={{display:"flex",flexDirection:"column",gap:"0.2rem",marginLeft:"1rem"}}>
                            <label>Enter Address:</label>
                            <textarea type="text" style={{width:"15rem",height:"4rem"}} onChange={(e)=>setLocation(e.target.value)}/>
                            </div>
                            }
                            <button className="book-car-btn" onClick={bookCar}>Book</button>
                        </div>
                    </Card>
                }
            </div>
        </div>
    )
}

export default BookCar
