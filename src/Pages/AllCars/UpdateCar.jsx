import "./UpdateCar.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card"
import { CiEdit } from "react-icons/ci";
import { updateImage, updateImageData } from "../../API/api.js";

const UpdateCar = ({ fetchImages }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cars = useSelector((state) => state.carreducers.cars);
  const user = useSelector((state) => state.userreducer);
  //console.log(user);
  const car = cars?.find((car) => car._id === id);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [carData, setCarData] = useState({
    _id: id,
    carname: car?.carname,
    cardesc: car?.cardesc,
    price: car?.price,
  });

  const [file, setFile] = useState(null);

  const updateCarData = async () => {
    try {
      const response = await updateImageData(carData);
      fetchImages()
      setTimeout(() => {
        navigate("/allcars");
      }, 0);
    }
    catch (error) {
      console.log(error.message)
    }

  }


  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", id);

    try {
      const response = await updateImage(formData);
      console.log(response.data)
      fetchImages();
      setShowImageUpload(false);
      setFile(null);
      setTimeout(() => {
        navigate("/allcars");
      }, 0);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <div className="update-car">
      <h2 className="update-heading">Update Car</h2>
      <div className="update-form-container">
        <div className="update-form">
          <Card style={{ width: '18rem' }} className="update-card">
            <div style={{ position: "relative" }}>
              {showImageUpload ?
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  {/* Styled label that opens the file dialog */}
                  <label htmlFor="fileInput" style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '10px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}>{file?.name || "Choose Image"}</label>
                  <button style={{marginTop:"1rem"}} onClick={()=>uploadImage()}>Upload</button>
                </div>
                :
                <Card.Img variant="top" src={car?.url} style={{ height: "10rem", zIndex: "1" }} />
              }
              {user?.role === "owner" && (
                <CiEdit
                  size={22}
                  fill="white"
                  className="edit-btn"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 2,
                    background: "black",
                    borderRadius: "50%",
                    padding: "2px"
                  }}
                  onClick={() => setShowImageUpload(!showImageUpload)}
                />
              )}
            </div>
            {showUpdateForm ?
              <Card.Body>
                <div>
                  <input type="text" placeholder={car?.carname} onChange={(e) => setCarData({ ...carData, carname: e.target.value })} style={{ width: "14rem" }} />
                  {user?.role === "owner" && <CiEdit size={22} fill="black" onClick={() => setShowUpdateForm(!showUpdateForm)} className="edit-btn" />}
                </div>
                <Card.Text className="card-text">
                  <textarea
                    placeholder={car?.cardesc}
                    onChange={(e) => setCarData({ ...carData, cardesc: e.target.value })}
                    style={{ width: "14rem", height: "4rem", marginTop: "1rem" }} />
                  <label htmlFor="price" style={{ marginTop: "1rem" }}>Price:</label>
                  <input type="number" placeholder={car?.price} onChange={(e) => setCarData({ ...carData, price: e.target.value })} style={{ width: "14rem" }} />
                </Card.Text>
                <button className="update-btn" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} onClick={() => {
                  updateCarData();
                  setShowUpdateForm(false);
                }}>Update</button>
              </Card.Body>
              :
              <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Card.Title>{car?.carname}</Card.Title>
                  {user?.role === "owner" && <CiEdit size={22} fill="black" onClick={() => setShowUpdateForm(!showUpdateForm)} className="edit-btn" />}
                </div>
                <Card.Text className="card-text">
                  <p style={{ width: "16rem" }}>{car?.cardesc}</p>
                  <p style={{ width: "16rem" }}>Price: {car?.price} per day</p>
                </Card.Text>
              </Card.Body>
            }
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UpdateCar;