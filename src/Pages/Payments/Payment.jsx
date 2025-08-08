import "./Payment.css"
import { useSocket } from "../../Socket"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { createOrder, verifyPayment } from "../../API/api"
import { useSelector } from "react-redux"
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"

export const PaymentPage = () => {
    const { id } = useParams()
    const socket = useSocket()
    const booking = useSelector(state => state.bookingreducers?.bookings?.find(b => b._id === id))
    const car = useSelector(state => state.carreducers?.cars?.find(c => c._id === booking?.carId))
    const [showBillDetails, setShowBillDetails] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // clean up
        };
    }, []);


    const makePayment = async () => {
        const res = await createOrder({ amount: 1 })
        const order = res?.data;
        console.log(order?.id, order?.amount)

        const options = {
            key: "rzp_test_4P7YbzYOB7SZar",
            amount: order?.amount,
            currency: "INR",
            name: "AMR Wheels",
            description: "Car Booking",
            order_id: order?.id,
            handler: async function (response) {
                const res = await verifyPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    amount: order.amount,
                    bookingId: id
                })

                const data = await res?.data;

                if (data?.success) {
                    socket?.current?.emit("booking-completed", { bookingId: id })
                     setTimeout(() => {
                        navigate('/mybookings'); // or any route
                    }, 3000); // 3 seconds
                }
                else
                    alert("payment not successfull")
            },
            prefil: {
                name: 'Test User',
                email: 'test@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },

        }

        const rzp = new window.Razorpay(options)
        rzp.open();
    }


    /*const handlePayment=()=>{
        if(socket?.current?.connected)
            socket.current.emit("paymentDone",{bookingId:id})
    }
    useEffect(()=>{
        socket?.current?.on("BookingDone",()=>console.log("booking done"))
    },[socket.current])*/

    return (
        <div className="Payment-page">
            <div className="payment-container">
                <img src={car?.url} style={{ width: "18rem", height: "12rem" }} />
                <div style={{ marginLeft: "1rem" }}>
                    <p style={{ marginTop: "0.5rem" }}>{car?.carname}</p>
                    <p style={{ textWrap: "wrap", width: "18rem" }}>{car?.cardesc}</p>
                    <p>Price:  ₹{car?.price} per day +5000</p>
                    <p style={{ color: "GrayText" }}>(5000 Security deposit Refundable)</p>
                    <p style={{ textWrap: "wrap", width: "18rem" }}>Booking Start Date: {new Date(booking?.bookingStartDate).toDateString()}</p>
                    <p style={{ textWrap: "wrap", width: "18rem" }}>Booking End Date: {new Date(booking?.bookingEndDate).toDateString()}</p>
                    {booking?.pickUpDrop &&
                        <p style={{ textWrap: "wrap", width: "18rem" }}>{booking?.location}</p>}
                    <div style={{ display: "flex", gap: "0.2rem" }}>
                        <p>Bill: ₹{booking?.bookingCharges}</p>
                        <RiArrowDropDownLine style={{ marginTop: "0.2rem" }} onClick={e => { setShowBillDetails(!showBillDetails) }} />
                    </div>
                    {showBillDetails &&
                        <div style={{ backgroundColor: "rgb(255,255,255)", color: "black", padding: "0.5rem", borderRadius: "0.5rem", width: "16rem" }}>
                            <p>Price: ₹{car?.price*(Math.floor((new Date(booking?.bookingEndDate) - new Date(booking?.bookingStartDate)) / (1000 * 60 * 60 * 24)))} <span style={{ textAlign: "end" }}>({car?.price}</span> *{Math.floor((new Date(booking?.bookingEndDate) - new Date(booking?.bookingStartDate)) / (1000 * 60 * 60 * 24))})</p>
                            {booking?.pickUpDrop && <p>Pick Up/Drop Charges: ₹500</p>}
                            <p>Security Deposit: ₹5000</p>
                            <p>Total: {booking?.bookingCharges}</p>
                            <p style={{ textAlign: "center", color: "GrayText" }}>(Security Depoit is Refundable)</p>
                        </div>}
                    <button className="payment-btn" onClick={makePayment}>Pay Now</button>
                </div>
            </div>
        </div>
    )
}