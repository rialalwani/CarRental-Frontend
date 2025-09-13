import { Link } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
export const TermsAndConditions=()=>{
    return (
        <div style={{backgroundColor:"rgba(0,0,0,0.865)",color:"white",padding:"40px"}}> 
            <h3 style={{textAlign:"left"}}>Terms And Conditions</h3>
            <p style={{marginTop:"1.5rem"}}>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern AMR Wheels's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</p>
            <p>Ownership</p>
            <ol>
                <li>The term 'AMR Wheels' or 'us' or 'we' refers to the AMR Wheels CAR RENTALS PRIVATE LIMITED whose registered office is 'Jamboo Akhada, near Hanuman Mandir, Bhalubhasa, Jamshedpur, 831009' The term 'you' refers to the user or viewer of our website.</li>
            </ol>
            <p>Terms of Use:</p>
            <ol>
                <li>
                    The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                </li>
                <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: IP Address, Location.</li>
                <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
                <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.</li>
                <li>Specific offers will have might have additional Terms & Conditions which the user has to comply with in case he chooses to avail that offer.</li>
            </ol>
            <p>Cancellation and Returns</p>
            <ol>
                <li>You may cancel the booking at any moment. However, cancellation charges will apply. You can cancel your booking through AMR Wheels website .</li>
                <li>Refunds
                    <ol>
                        <li>If you are eligible for refunds based on the <Link to="/refund-policy" style={{color:"cornflowerblue"}}>Cancellation and Refund</Link> policy, then the refund will be remitted back to you in 5-7 working days. In case of any issues, write to us at <span style={{color:"cornflowerblue"}}>ariyanmishra137@gmail.com</span> or call us at <span style={{color:"cornflowerblue"}}>9546437276</span>.</li>
                    </ol>
                </li>
            </ol>
            <Footer/>
        </div>
    )
}