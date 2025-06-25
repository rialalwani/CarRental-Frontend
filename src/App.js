import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/User/Home/Home.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./Pages/User/Login/Login.jsx"
import ResetPassword from "./Pages/Reset/Reset.jsx";
import { AllCars } from "./Pages/AllCars/AllCars.jsx";
import CarBook from "./Pages/AllCars/CarBook.jsx"
import { MyBookings } from "./Pages/User/Bookings/MyBookings.jsx";
import { getImages } from "./API/api.js";
import { getallimages } from "./Counter/carsCounterSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UpdateCar from "./Pages/AllCars/UpdateCar.jsx";
import { log_out } from "./Counter/counterslice.js";
import AllBookings from "./Pages/User/Bookings/AllBookings.jsx"

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

  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/allcars" element={<AllCars fetchImages={fetchImages} />}></Route>
          <Route path="/book/:id" element={<CarBook />}></Route>
          <Route path="/mybookings" element={<MyBookings />}></Route>
          <Route path="/update/:id" element={<UpdateCar fetchImages={fetchImages} />}></Route>
          <Route path="/allbookings" element={<AllBookings/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
