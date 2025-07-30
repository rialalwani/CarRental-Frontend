import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
export const Contact=()=>{
    return(
        <div style={{ textAlign: 'center',height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',background:"rgba(0,0,0,0.865)",color:"white" }}>
            <h3>Contact Us</h3>
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>
                <FaPhoneAlt /> Phone: +91 9546437276
                <CiMail/> Email: ariyanmishra137@gmail.com
            </p>
        </div>
    )
}