import './AllCars.css'
import Card from "react-bootstrap/Card"
import { Link, useNavigate } from "react-router-dom"
import {  useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { deleteImage, updateAvailability } from '../../API/api.js'

export const AllCars = ({fetchImages}) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.userreducer)


    useEffect(()=>fetchImages(),[])
    const sortMap = {
        "Available": 0,
        "Booked": 1,
        "Not Available": 2
    };
    const cars = useSelector(state => state.carreducers.cars)

    const [editCarId, setEditCarId] = useState([]);

    useEffect(() => {
        setEditCarId(cars.map(car => ({ _id: car._id, edit_opn: false })));
    }, [cars]);

    useEffect(() => {
        console.log('Updated editCarId:', editCarId);
    }, [editCarId]);


    const sortedCars = [...cars].sort((a, b) => {
        return sortMap[a.availability] - sortMap[b.availability];
    });



    //console.log(sortedCars)

    // Function to handle edit option open for a particular car
    const handleEditClick = (carId) => {
        //alert("working");
        setEditCarId(prev =>
            prev.map(item =>
                item._id === carId ?
                    { ...item, edit_opn: !item.edit_opn } // Toggle edit option for the clicked car
                    :
                    { ...item } // Toggle edit option for the clicked car
            )
        );
    };

    const archiveCar = async (carId) => {
        try {
            const response = await updateAvailability({ _id: carId});
            fetchImages()
            console.log("Car archived successfully:", response.data);
        }
        catch (error) {
            console.error("Error archiving car:", error);
        }
    };

    const deleteCar = async (carId) => {
        try {
            const response = await deleteImage({ _id: carId });
            fetchImages()
            console.log("Car deleted successfully:", response.data);
        }
        catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className='allcarsdiv'>
             <h4 style={{color:"white",textDecoration:"underline",textAlign:"center"}}>All Cars</h4>
        <div className="allcarsdiv1">
            {sortedCars?.map((car) =>
                <Card key={car?._id} style={{ width: '18rem', height: "24rem", position: "relative" }} className="carsdiv1">
                    <Card.Img variant="top" src={car?.url} style={{ height: "10rem" }} />
                    {car?.availability !== "Available" && 
                    <div className='gray-bg'>
                        <p className='not-available-text'>Not Available</p>
                        {user.role === "owner" &&
                            <div>
                                <div style={{ position: "absolute", bottom: "0", right: "0", padding: "10px", zIndex: 2 }}>
                                    <div onClick={() => handleEditClick(car._id)}>
                                        <HiOutlineDotsHorizontal fontSize={20} />
                                    </div>
                                </div>
                                {car?.availability === "Available" && editCarId.find(item => item._id === car._id && item.edit_opn) &&
                                    <div
                                        className='car-edit-options'>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => navigate(`/update/${car?._id}`)}>Update</p>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => archiveCar(car._id)}>{car?.availability==="Available"?"Archive":"Unarchive"}</p>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => deleteCar(car._id)}>Delete</p>
                                    </div>}
                            </div>}
                    </div>}
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
                                    <p style={{ position: "absolute", bottom: "10%" }}>Price: {car?.price} per day</p>
                                </div>
                            </Card.Text>
                        </div>
                        {user.role === "owner" &&
                            <div>
                                <div style={{ position: "absolute", bottom: "0", right: "0", padding: "10px", zIndex: 2 }}>
                                    <div onClick={() => handleEditClick(car._id)}>
                                        <HiOutlineDotsHorizontal fontSize={20} />
                                    </div>
                                </div>
                                {editCarId.find(item => item._id === car._id && item.edit_opn) &&
                                    <div
                                        className='car-edit-options'>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => navigate(`/update/${car?._id}`)}>Update</p>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => archiveCar(car._id)}>{car?.availability==="Available"?"Archive":"Unarchive"}</p>
                                        <p style={{ margin: 0, padding: "8px 16px", cursor: "pointer" }} onClick={() => deleteCar(car._id)}>Delete</p>
                                    </div>}
                            </div>
                        }
                        <div style={{ position: "absolute", bottom: "3%", width: "100%" }}>
                            {user.role !== "owner" &&
                                <Link to={`/book/${car?._id}`}>Book</Link>
                            }
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
        </div>
    )
}