import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Home from "./Pages/User/Home/Home.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./Pages/User/Login/Login.jsx"
import ResetPassword from "./Pages/Reset/Reset.jsx";
import { AllCars } from "./Pages/AllCars/AllCars.jsx";
import CarBook from "./Pages/AllCars/CarBook.jsx"
import { MyBookings } from "./Pages/User/Bookings/MyBookings.jsx";
import { getAllBookings, getImages, getUserBookings } from "./API/api.js";
import { getallimages } from "./Counter/carsCounterSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UpdateCar from "./Pages/AllCars/UpdateCar.jsx";
import { log_out } from "./Counter/counterslice.js";
import AllBookings from "./Pages/User/Bookings/AllBookings.jsx"
import { getMyBookings } from "./Counter/bookingsCounterSlice.js";
import { useSelector } from "react-redux";
import { getAllUsers } from "./API/api.js";
import { allUsers } from "./Counter/UsersCounterSlice.js";
import { useSocket } from "./Socket.js";
import { toast, ToastContainer } from "react-toastify"
import "./App.css"
import { PaymentPage } from "./Pages/Payments/Payment.jsx";
import { getAllCancelledBookings,getCancelledBookings } from "./API/api.js";
import { getMyCancelledBookings } from "./Counter/cancelledBookingsSlice.js";
import {PrivacyPolicy} from "./Pages/Policies/PrivacyPolicy/PrivacyPolicy.jsx";
import {RentalAgreement} from "./Pages/Policies/RentalAgreement/RentalAgreement.jsx";
import {RefundPolicy} from "./Pages/Policies/Refund/Refund.jsx";
import {DamagePolicy} from "./Pages/Policies/Damage/Damage.jsx";
import {OutstationPolicy} from "./Pages/Policies/Outstation/Outstation.jsx";
import {Contact} from "./Pages/Contact/contact.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx"
import { getTransactions } from "./Counter/transactions.js";
import { getMyTransactions,getAllTransactions } from "./API/api.js";
import { MyTransactions} from "./Pages/Transactions/MyTransactions.jsx";
import { AllTransactions } from "./Pages/Transactions/AllTransactions.jsx";

function App() {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch(err => console.error("SW registration failed:", err));
  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.userreducer)
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {

    if (!socket.current) return;

    //console.log(socket?.current?.id)

    function handleNewBookingRequest() {

      fetchAllBookings()
      toast.info("New Booking Request", {
        onClick: () => {
          toast.dismiss();
          navigate("/allbookings");
        },
        autoClose: 20000,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }


    
    const handleBookingAccepted = () => {
      fetchBookings()
      toast.info("Booking Accepted", {
        onClick: () => {
          toast.dismiss();
          navigate("/mybookings");
        },
        autoClose: 20000,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }

    function handleNewBooking() {
      fetchAllBookings()
      toast.info("New Booking", {
        onClick: () => {
          toast.dismiss();
          navigate("/allbookings");
        },
        autoClose: 20000,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }

    function handleBookingCancellation(){
      if(user.role==="verified-user")
      {
        fetchBookings()
        fetchCancelledBookings()
      }
      else if(user.role==="owner")
      {
        fetchAllBookings()
        fetchAllCancelledBookings()
      }

      toast.info("Booking Cancelled", {
        onClick: () => {
          toast.dismiss();
          if(user.role==="verified-user")
            navigate("/mybookings")
          else if(user.role==="owner")
            navigate("/allbookings");
        },
        autoClose: 20000,
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }

    const handleError=(message)=>{
      alert(message)
    }



    socket.current.on("NewRequest", handleNewBookingRequest);
    socket.current.on("BookingAccepted", handleBookingAccepted)
    socket.current.on("NewBooking",handleNewBooking)
    socket.current.on("Booking-Cancelled",handleBookingCancellation)
    socket.current.on("error",({message})=>handleError(message))


    return () => {
      socket.current.off("NewRequest", handleNewBookingRequest);
      socket.current.off("BookingAccepted", handleBookingAccepted)
      socket.current.off("NewBooking",handleNewBooking)
      socket.current.off("Cancelled-No-Transactions",handleBookingCancellation)
    };
  }, [socket.current]);

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // convert to ms
      return Date.now() > exp;
    } catch (e) {
      return true;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      // Dispatch logout to global state or redirect
      dispatch(log_out()); // example
    }
  }, []);


  const fetchImages = () => {
    getImages().
      then((data) => {
        dispatch(getallimages(data?.data))
      })
      .catch((error) => console.log(error.message))
  }

  const fetchBookings = () => {
    getUserBookings()
      .then((response) => {
        //console.log(response.data)
        dispatch(getMyBookings(response?.data))
      })
      .catch(error => console.log(error.message))
  }

  const fetchAllBookings = () => {
    getAllBookings()
      .then((response) => {
        dispatch(getMyBookings(response?.data))
      })
      .catch(error => console.log(error.message))
  }

  const fetchAllCancelledBookings=()=>{
    getAllCancelledBookings().then((response)=>dispatch(getMyCancelledBookings(response?.data))).catch(error => console.log(error.message))
  }

  const fetchCancelledBookings=()=>{
    getCancelledBookings().then((response)=>dispatch(getMyCancelledBookings(response?.data))).catch(error => console.log(error.message))
  }

  const getallusers = () => {
    if (user) {
      getAllUsers().then((response) => {
        //console.log(response?.data)
        dispatch(allUsers(response?.data))
      })
        .catch(error => console.log(error.message))
    }
  }

  const fetchMyTransactions = () => {
    getMyTransactions()
      .then((response) => {
        dispatch(getTransactions(response?.data))
      })
      .catch(error => console.log(error.message))
  }

  const fetchAllTransactions=()=>{
    getAllTransactions()
    .then((response)=>{
      //console.log(response.data)
      dispatch(getTransactions(response?.data))
    })
    .catch(error=>console.log(error.message))
  }

  useEffect(() => {
    fetchImages()
    if (user.role === "verified-user") {
      fetchBookings();
      fetchCancelledBookings();
      fetchMyTransactions();
    }
    if (user.role === "owner") {
      getallusers();
      fetchAllBookings();
      fetchAllCancelledBookings()
      fetchAllTransactions()
    }
  }, [])


  return (
    <div className="App">
      <Navbar></Navbar>
      <ToastContainer position="top-center" autoClose={20000} hideProgressBar className="custom-toast"
        bodyClassName="custom-toast-body" />
      <Routes>
        <Route path="/" element={<Home fetchImages={fetchImages} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/allcars" element={<AllCars fetchImages={fetchImages} />}></Route>
        <Route path="/book/:id" element={<CarBook fetchBookings={fetchBookings} />}></Route>
        {user.role==="verified-user" && <Route path="/mybookings" element={<MyBookings fetchBookings={fetchBookings} fetchCancelledBookings={fetchCancelledBookings}/>}></Route>}
        <Route path="/update/:id" element={<UpdateCar fetchImages={fetchImages} />}></Route>
        {user.role==="owner" && <Route path="/allbookings" element={<AllBookings fetchAllBookings={fetchAllBookings} fetchAllCancelledBookings={fetchAllCancelledBookings}/>}></Route>}
        <Route path="/pay/:id" element={<PaymentPage/>}></Route>  
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/rental-agreement" element={<RentalAgreement/>}></Route>
        <Route path="/refund-policy" element={<RefundPolicy/>}></Route>
        <Route path="/outstation-policy" element={<OutstationPolicy/>}></Route>
        <Route path="/damage-policy" element={<DamagePolicy/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
        {user.role==="owner" && <Route path="/alltransactions" element={<AllTransactions/>}></Route>}
        {user.role==="verified-user" && <Route path="/mytransactions" element={<MyTransactions/>} ></Route>}
      </Routes>
    </div>
  );
}

export default App;
