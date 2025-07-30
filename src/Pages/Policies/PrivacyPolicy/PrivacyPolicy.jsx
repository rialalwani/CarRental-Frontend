import {Link} from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
export const PrivacyPolicy = () => {
    return (
        <div style={{backgroundColor:"rgba(0,0,0,0.865)",color:"white",padding:"40px"}}> 
            <h3 style={{textAlign:"left"}}>Privacy Policy</h3>
            <p style={{marginTop:"1.5rem"}}>We view the protection of your privacy as a very important principle. In case we ask you to provide certain information by which you can be identified when using our website that will also be used by this privacy statement AMR Wheels reserves the right to change this policy from time to time. We store and process your information, including any sensitive financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures by Information Technology Act 2000. The user/customer is asked to submit personal data or information under (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 (Privacy Rules).</p>
            <ol>
                <li>What do we collect</li>
                <ol>
                    <li>Name</li>
                    <li>Mobile Number</li>
                    <li>Email</li>
                    <li>Adhaar Card</li>
                    <li>Driving License</li>
                    <li>Other information relevant to user/customer surveys and/or offers etc:</li>
                    <ol>
                        <li>Location Tracking</li>
                        <ol>
                            <li> We track the location of all our vehicles to locate the user/customer in case of emergencies, accidents, thefts, or any other mishaps. The same data may be shared with insurance companies, government agencies or law enforcement agencies in the course of an investigation.</li>
                        </ol>
                        <li>User Behaviour</li>
                        <ol>
                            <li>User/customer information will be collected and shared through the GPS devices and shared with third-party applications to improvise the services.</li>
                        </ol>
                    </ol>
                </ol>
                <li>Use Of Information</li>
                <ol>
                    <li>We will use all your personal information for record-keeping to provide you with a better rental experience through AMR Wheels</li>
                    <li>To collect and refund the payment to you.</li>
                    <li>To respond to your queries and questions.</li>
                    <li>To address you if we have a proven point that you are violating the right of any third party or any agreement or policy that governs your use of website services/products.</li>
                    <li>To gain the the consent of communication in all the possible ways, once user/customer sign up on our platform until service fee outstanding or invoice or account is cleared(paid) & User/customer has no right to withdraw the consent.</li>
                </ol>
                <li>Grievances</li>
                <ol>
                    <li> If you have any grievances against the Website's privacy practices, or you apprehend that your privacy is compromised at the Website, please write to us: at <span style={{color:"cornflowerblue"}}>ariyanmishra137@gmail.com</span> we assure you, we will proactively address your concerns.</li>
                    <li> Please note that the policy may change from time to time. In case of any changes, the same will be updated on the website without any prior notice.</li>
                    <li>In case of any discrepancies, please contact the respective –</li>
                    <p style={{marginTop:"1rem"}}>Address:  Jamboo Akhada, near Hanuman Mandir, Bhalubhasa, Jamshedpur, 831009</p>
                     <p> Support: +91 9546437276</p>
                     <p> Email: ariyanmishra137@gmail.com</p>
                </ol>
            </ol>
            <Footer/>
        </div>
    )
}