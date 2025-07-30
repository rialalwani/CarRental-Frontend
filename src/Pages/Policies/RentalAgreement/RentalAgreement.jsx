import {Link} from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
export const RentalAgreement = () => {
  return (
    <div className="rental-agreement" style={{backgroundColor:"rgba(0,0,0,0.865)",color:"white",padding:"40px"}}>
      <h3>Rental Agreement</h3>
      <ol style={{display:"flex",flexDirection:"column"}}>
        <li>All transactions will be carried out between the user/customer and AMR Wheels.</li>
        <li> The user/customer must be older than 18 years old.</li>
        <li>Documents Required</li>
        <ol>
          <li>The user/customer must have a valid Aadhaar ID and driving license issued by the Government of India.</li>
          <li>The user/customer must scan his/her license and Aadhaar Id and upload it on our website.</li>
          <li> If a user/customer is unable to verify his/her identity and driving license, the booking shall be considered void by AMR Wheels.</li>
        </ol>
        <li>Refundable Security Deposit</li>
        <ol>
          <li>Booking a vehicle through AMR Wheels does need a security deposit.</li>
          <li>Users/customers should pay digitally using UPI, Debit Card, Credit Card, Mobile Wallets, and Payment Link. In case of any fraudulent cash transaction AMR Wheels will not be responsible.</li>
          <li>AMR Wheels Holds the right to redeem the security deposit against valid vehicle damage charges, valid traffic penalties, or valued overtime charges.</li>
        </ol>
        <li>Pickup Points</li>
        <ol>
          <li>You can pick up the car from the given address.</li>
          <p style={{marginTop:"1rem"}}>Address:  Jamboo Akhada, near Hanuman Mandir, Bhalubhasa, Jamshedpur, 831009</p>
          <li>AMR provides pick up drop option with additional charges.</li>
        </ol>
        <li>Return of Possession</li>
        <ol>
          <li>The user/customer must return possession of the vehicle at the pickup point from which it had been hired.</li>
        </ol>
        <li>Fee Break-Up</li>
        <ol>
          <li>AMR Wheels calculates the rental charge on the following basis:</li>
          <table style={{marginTop:"1rem",width:"100%",borderCollapse:"collapse",border:"1px solid white"}}>
            <thead>
              <tr>
                <th style={{borderRight:"1px solid white"}}>Vehicle</th>
                <th style={{borderRight:"1px solid white"}}>Rental Fee (per day)</th>
                <th>Security Deposit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{borderRight:"1px solid white"}}>Verna</td>
                <td style={{borderRight:"1px solid white"}}>₹2000</td>
                <td>₹5000</td>
              </tr>
              <tr>
                <td style={{borderRight:"1px solid white"}}>Baleno</td>
                <td style={{borderRight:"1px solid white"}}>₹2500</td>
                <td>₹5000</td>
              </tr>
            </tbody>
          </table>
          <p style={{marginTop:"0.5rem"}}>(Pick up drop charges is ₹500)</p>
        </ol>
        <li> Extension of Rental Period </li>
        <ol>
          <li>If the user/customer wishes to extend the rental period, He/she can contact the owner. Please note extension of rides is possible only in the case when there is no subsequent booking.</li>
          <p style={{marginTop:"0.5rem"}}> Support: +91 9546437276</p>
          <p> Email: ariyanmishra137@gmail.com</p>
        </ol>
        <li> Prohibited use of vehicle</li>
        <ol>
          <li>The use of a Lessor's vehicle is prohibited under the following circumstances:</li>
          <ol>
            <li>
               Our vehicles are not permitted to be used in rallies, rally surcharges, professional or amateur competitions, or media usage.
            </li>
            <li>Any person who is under the influence of (i) alcohol or (ii) any drug or medication, the operation of which is prohibited or not recommended.</li>
            <li>
               In the commission of any crime or other illegal activity.
            </li>
          </ol>
        </ol>
        <li>Traffic Challans and Penalties</li>
        <ol>
          <li>All penalties, challans, or legal fines imposed by any traffic or transport authority (local/state/central) are the sole responsibility of the the customer using the vehicle.</li>
          <li>AMR Wheels will not be held responsible for any such penalties.</li>
        </ol>
        <li>For Cancellation and Refunds, read <Link to="/refund-policy" style={{color:"cornflowerblue"}}>refund policy</Link>.</li>
        <li>Read the <Link style={{color:"cornflowerblue"}} to="/damage-policy">damage policy</Link> before you book a car.</li>
        <li>If you want to visit an outstation,read <Link style={{color:"cornflowerblue"}} to="/outstation-policy">outstation policy</Link></li>
        <li>Agreement</li>
        <ol>
          <li>User/customer is solely responsible for the person for the rental period and activities that happened/occurred/done by the user using the vehicle.</li>
          <li>Under no circumstances shall AMR Wheels be liable to the user/customer or any other person or entity for any special, consequential, incidental, indirect, exemplary, or punitive damages arising out of this Agreement, regardless of cause.</li>
          <li>Being the user/customer of the AMR Wheels platform, the user/customer agreed/bound to this <Link  style={{color:"cornflowerblue"}} to="/privacy-policy">privacy policy</Link>, <Link to="/refund-policy" style={{color:"cornflowerblue"}}>cancellation policies</Link>, <Link to="/damage-policy" style={{color:"cornflowerblue"}}>damage policies</Link> as well as <Link style={{color:"cornflowerblue"}} to="outstation-policy">outstation policy</Link> and this online agreement. The User/Customer is under the section of the information technology act 2000.</li>
        </ol>
      </ol>
      <Footer/>
    </div>
  );
}