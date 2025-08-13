import { useEffect, useState } from "react";
import "./Login.css"
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom"
import * as api from "../../../API/api.js"
import { verifyotp, log_in } from "../../../Counter/counterslice.js";
import { useDispatch, useSelector } from "react-redux"
import { TiTick } from "react-icons/ti";
import {DotLottieReact} from "@lottiefiles/dotlottie-react"

const Login = () => {
    const [signup, setSignup] = useState(false)//false for login
    const [otp, setotp] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showotp, setShowotp] = useState(false)
    const [name, setname] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.userreducer)
    console.log(user)
    const SendOtp = () => {
        if (!email) {
            alert("Enter your email id")
        }
        else {
            api.sendotp(email)
                .then(() =>
                    setShowotp(true))
                .catch((error) => {
                    console.log(error)
                    alert(error?.response?.data)
                })
        }
    }

    const register = () => {
        if (!otp) {
            alert("Enter otp")
        }
        else if (!password)
            alert("Enter password")
        else if (!phonenumber)
            alert("Enter your phone number")
        else if (!name)
            alert("Enter name")
        else {
            const data = { email: email, Otp: otp, name: name, number: phonenumber, password: password };
            api.verifyotp(data)
                .then((response) =>
                    dispatch(verifyotp(response.data)))
                .catch((error) => {
                    alert(error?.response?.data)
                })
        }
    }
    const login = () => {
        if (!email)
            alert("Enter your email id")
        else if (!password)
            alert("Enter password")
        else {
            const data={email:email,password:password}
            api.login(data)
                .then((response) => dispatch(log_in(response?.data)))
                .catch((error) => {
                    console.log(error)
                    alert(error?.response?.data)
                })
        }
    }


    return (
        <div className="login-page">
            <div className="part-1">
                <p className="heading">Welcome to AMR WHEELS</p>
                <p className="heading2">Get your favourite cars at affordable prices</p>
                <p className="heading3" style={{ fontSize: "larger" }}>Anytime, Anywhere</p>
                <DotLottieReact className="car-animation" src="https://lottie.host/0d003a06-cd44-44e2-b842-e8dd55afd36c/BtDkHNs2t4.lottie" loop autoplay></DotLottieReact>
            </div>
            {user?.email ?
                <div className="logindiv" style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                    <div style={{ fontSize: "large" }}>
                        User logged in successfully<TiTick size={32} style={{ color: "green" }} />
                    </div>
                    <Link to='/' className="dashboardbtn">Go To Dashboard</Link>
                </div>
                :
                <div className="logindiv">
                    <div className="loginform">
                        {signup ?
                            <p className="form-top">Sign Up</p>
                            :
                            <p className="form-top">Login</p>
                        }
                        <IoPersonCircle style={{ color: "white" ,marginTop:"1rem"}} size={45} />
                        {signup ?
                            <form className="login-form">
                                <label>Email</label>
                                <input type='email' placeholder="Enter your email" onChange={e => setEmail(e.target.value)}></input>
                                {showotp && <p>We have sent an otp to your mail id</p>}
                                {showotp && <div className="otpbox">
                                    <label>OTP</label>
                                    <input type="text" placeholder="Enter Otp" onChange={e => setotp(e.target.value)}></input>
                                </div>}
                                {!showotp && <p onClick={SendOtp} style={{ textDecoration: "underline", color: "blue", textAlign: "center" }}>Verify Email</p>}
                                <input type="text" placeholder="Enter name" onChange={e => setname(e.target.value)} />
                                <input type="number" placeholder="Enter phone number" onChange={e => setphonenumber(e.target.value)} />
                                <input type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                <div className="btns">
                                    <button type="button" className="sign-in" onClick={register}>Sign-Up</button>
                                    <button type="button" className="login" onClick={e => setSignup(false)}>Login</button>
                                </div>
                            </form>
                            :
                            <form className="login-form">
                                <label>Email</label>
                                <input type='email' placeholder="Enter your email" onChange={e => setEmail(e.target.value)}></input>
                                <label>Password</label>
                                <input type='password' placeholder="Enter password" onChange={e => setPassword(e.target.value)}></input>
                                <Link className="forget-pass" to="/reset-password">Forgot Password?</Link>
                                <div className="btns">
                                    <button type="button" className="sign-in" onClick={e => setSignup(true)}>Sign-Up</button>
                                    <button type="button" className="login" onClick={login}>Login</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Login