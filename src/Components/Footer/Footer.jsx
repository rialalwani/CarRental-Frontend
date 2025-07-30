import "./Footer.css"
import {Link} from "react-router-dom"
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer=()=>{
  return(
    <div className="footer">
        <div className="footer-content">
            <div className="info" style={{width:"20rem"}}>
              <h5 style={{fontWeight:"bolder",textAlign:"center",marginTop:"1rem"}}>AMR Wheels</h5>
              <p style={{textWrap:"wrap",width:"20rem",marginTop:"2rem",textAlign:"center"}}>AMR wheels is a car rental platform that allows users to rent cars conveniently from various locations. The platform enables customers to browse available vehicles, check pricing, make bookings, and manage reservations—all in one place.</p>
            </div>
            <div className="policies-div" style={{display:"flex",width:"20rem"}}>
                
                <div  className="policies" style={{textAlign:"center",width:"20rem",marginTop:"1rem"}}>
                <h5 style={{fontWeight:"bolder",textAlign:"center"}}>Policies</h5>
                <Link to="/privacy-policy" className="links" style={{marginTop:"0.5rem",color:"white"}}>Privacy Policy</Link>
                <Link to="/rental-agreement" className="links" style={{color:"white"}}>Rental Agreement</Link>
                <Link to="/refund-policy" className="links" style={{color:"white"}}>Refund and Cancellation</Link>
                <Link to="/outstation-policy" className="links" style={{color:"white"}}>Outstation Policy</Link>
                <Link to="/damage-policy" className="links" style={{color:"white"}}>Damage/Penalties</Link>
                </div>
            </div>
            <div className="contacts" style={{textAlign:"center",width:"20rem"}}>
                <h5 style={{fontWeight:"bolder",textAlign:"center",marginTop:"1rem"}}>Contact Us</h5>
                 <p style={{textWrap:"wrap",width:"20rem",marginTop:"2rem"}}>Address: Jambo Akhada near Hanuman Mandir,Bhalubhasa,Jamshedpur,831009</p>
                <p><CiMail/> ariyanmishra137@gmail.com</p>
                <p><FaPhoneAlt/> +91 9546437276</p>
            </div>
        </div>
    </div>
  )
}

export default Footer