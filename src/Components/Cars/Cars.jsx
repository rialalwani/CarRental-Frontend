import Card from "react-bootstrap/Card"
import "./Cars.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Cars = ({fetchImages}) => {
    const user = useSelector(state => state.userreducer)

    const cars = useSelector(state => state.carreducers).cars
    const sortMap = {
        "Available": 0,
        "Booked": 1,
        "Not Available": 2
    };

    const sortedCars = [...cars].sort((a, b) => {
        return sortMap[a.availability] - sortMap[b.availability];
    });
    
    
    return (
        <div>
        <h3 style={{color:"white",marginTop:"7rem",textAlign:"center",fontWeight:"bold",fontFamily:"sans-serif",textDecoration:"underline"}}>Cars</h3>
        <div className="carsdiv">
            {sortedCars?.map((car) =>
                <div key={car._id}>
                    <Card style={{ width: '18rem', height: "23rem",backgroundColor:"black" }} className="carsdiv1">
                        <Card.Img variant="top" src={car?.url} style={{ height: "10rem" }} />
                        {car?.availability !== "Available" && <div className='gray-bg-1'>
                            <div >
                                <p className='not-available-text-1'>Not Available</p>
                                {car?.nextAvailibility && <p style={{position:"absolute",top:"30%",color:"black",fontWeight:"bolder",marginLeft:"0.5rem",fontSize:"1.1rem"}}>Next Availibility {new Date(car?.nextAvailibility).toDateString()}</p>}
                            </div>
                              </div>}
                        <Card.Body>
                            <div className="card-content-fixed" style={{color:"white"}}>
                                <Card.Title>
                                    <div className="card-text">
                                        <p>{car?.carname}</p>
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <div className="card-desc">
                                             <p style={{ width: "17rem", textWrap: "wrap" }}>{car?.cardesc}</p>
                                             <p style={{position:"absolute",bottom:"8%"}}>Price: {car?.price} per day</p>
                                    </div>
                                </Card.Text>
                            </div>
                        </Card.Body>
                        <Card.Body style={{ position: "absolute", bottom: "0", width: "100%" }}>
                            {user.role !== "owner" &&
                                <Link to={`/book/${car?._id}`}>Book</Link>
                            }
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div></div>
    )
}

export default Cars