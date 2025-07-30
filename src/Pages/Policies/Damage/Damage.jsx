import Footer from "../../../Components/Footer/Footer";
export const DamagePolicy = () => {
  return (
    <div className="damage-policy" style={{backgroundColor:"rgba(0,0,0,0.865)",color:"white",padding:"40px"}}>
      <h3>Damage Policy</h3>
      <ol>
      <li>
        In the event of any damage to the vehicle during the rental period, the renter is responsible for all repair costs. 
        The security deposit will be used to cover any damages, and additional charges may apply if the repair costs exceed the deposit amount.
      </li>
      <li>
        It is the renter's responsibility to report any damage to the vehicle immediately upon discovery.
      </li>
      <li>Only AMR Wheels or its Staff or has the rights to decide the damage severity. For any consequential damages, the customer will be liable to pay the entire cost of repair.</li>
      </ol>
      <Footer/>
    </div>
  );
}