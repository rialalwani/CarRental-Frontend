import Footer from "../../../Components/Footer/Footer";
export const RefundPolicy = () => {
  return (
    <div className="refund-policy" style={{backgroundColor:"rgba(0,0,0,0.865)",color:"white",padding:"40px"}}>
      <h3>Refund Policy</h3>
      <ol>
        <li>A Booking goes may go through 5 stages</li>
        <ol>
          <li>Pending- When you have requested the booking and submitted your documents.</li>
          <li>Accepted- The booking is confirmed by the owner. You can complete the transaction to complete the booking</li>
          <li>Booked- Your car has been booked.</li>
          <li>Completed- Your trip has ended.</li>
          <li>Cancelled- The booking is cancelled by the owner or you.</li>
          <ol>
            <li>If a booking is in a Pending or Accepted state but not yet confirmed and is cancelled by either party, no payment will be processed.</li>
            <li>If a booking is in a Booked state and is cancelled by the owner, the user will receive a full refund.</li>
            <li>If a booking is in a Booked state and is cancelled by the user, the user will not receive a refund.</li>
          </ol>
        </ol>
        <li style={{marginTop:"0.5rem"}}> There won't be any fuel refund given by the ground staff at the time of ride end.
If User/customer requesting for the Fuel Refund then he should send an Email to <span style={{color:"cornflowerblue"}}>ariyanmishra137@gmail.com</span>. Only cases with more than 20% excess fuel than ride start fuel percentage will be entertained.</li>
      </ol>
      <Footer/>
    </div>
  );
}