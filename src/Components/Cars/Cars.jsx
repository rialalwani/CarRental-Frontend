import Card from "react-bootstrap/Card"
import "./Cars.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Cars = () => {
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
        <div className="carsdiv">
            {sortedCars?.map((car) =>
                <div key={car._id}>
                    <Card style={{ width: '18rem', height: "23rem" }} className="carsdiv1">
                        <Card.Img variant="top" src={car?.url} style={{ height: "10rem" }} />
                        {car?.availability !== "Available" && <div className='gray-bg-1'><p className='not-available-text-1'>Not Available</p></div>}
                        <Card.Body>
                            <div className="card-content-fixed">
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
        </div>
    )
}

export default Cars