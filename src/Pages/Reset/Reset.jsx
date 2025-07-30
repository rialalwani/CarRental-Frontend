import { useState } from "react"
import "./Reset.css"
import * as api from "../../API/api.js"
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom"

const ResetPassword = () => {
    const [showotp, setShowotp] = useState(false)
    const [otp, setotp] = useState("")
    const [email, setEmail] = useState("")
    const [passwordReset, showPasswordReset] = useState(false)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [passwordChanged, setPasswordChanged] = useState(false)
    const login = () => {
        if (!email) {
            alert("Enter your email id")
        }
        else {
            api.forgetPassword(email)
                .then(() => setShowotp(true))
                .catch((error) => alert(error?.response?.data))
        }
    }
    const submitotp = () => {
        if (!otp) {
            alert("Enter otp")
        }
        else {
            api.submitotp({ email: email, Otp: otp })
                .then(() => showPasswordReset(true))
                .catch((error) => alert(error?.response?.data))
        }
    }
    const changePassword = () => {
        if (!password1 || !password2) {
            alert("Enter password")
        }
        else if (password1 !== password2) {
            alert("Password 1 did not match Password 2")
        }
        else {
            api.resetPassword({ email: email, newPassword: password1 })
                .then(() => {
                    console.log("password changed")
                    setPasswordChanged(true)
                })
                .catch((error) => alert(error?.response?.data))
        }
    }
    console.log(passwordChanged)
    return (
        <div className="forget-password-page">
            {passwordChanged ?
                <div className="resetdiv1">
                    <div style={{ fontSize: "large" ,color:"white"}}>
                        Password changed successfully<TiTick size={32} style={{ color: "green" }} />
                    </div>
                    <Link to='/login' className="loginpagebtn">Go To Login Page</Link>
                </div>
                :
                <div className="resetform">
                    {passwordReset ?
                        <form className="reset-form">
                            <div className="form-top1"><p style={{marginTop:"1rem"}}>Reset Password</p></div>
                            <label>New Password</label>
                            <input type="password" placeholder="Enter password" onChange={e => setPassword1(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}}/>
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Enter password" onChange={e => setPassword2(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}}/>
                            <button type="button" onClick={changePassword} style={{background:"darkseagreen"}}>Submit</button>
                        </form>
                        :
                        <form className="reset-form">
                            <p className="form-top1">Reset Password</p>
                            <label>Email</label>
                            <input type='email' placeholder="Enter your email" onChange={e => setEmail(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}}></input>
                            {showotp && <div className="otpbox">
                                <label>OTP</label>
                                <input type="text" placeholder="Enter Otp" style={{ marginBottom: "1rem" ,background:"black",color:"white",border:"1px solid gray"}} onChange={e => setotp(e.target.value)} ></input>
                            </div>}
                            {showotp ?
                                <button type="button" onClick={submitotp} style={{background:"darkseagreen"}}>Submit</button>
                                :
                                <button type="button" onClick={login} style={{background:"darkseagreen"}}>Verify Email</button>}
                        </form>
                    }
                </div>
            }
        </div>
    )
}

export default ResetPassword