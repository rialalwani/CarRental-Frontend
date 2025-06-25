import { useState } from "react"
import "./ImageUpload.css"
import { useDispatch } from "react-redux"
import { uploadImage, getImages } from "../../API/api.js"
import { getallimages } from "../../Counter/carsCounterSlice.js"

const ImageUpload = ({ setImageUploadPage }) => {
    const [carModel, setCarModel] = useState("")
    const [carDesc, setCarDesc] = useState("")
    const [file, setFile] = useState(null)
    const [price, setPrice] = useState()
    const dispatch = useDispatch()

    const uploadCarDetails = () => {
        if (!file)
            alert("Upload car image")
        else if (!carModel)
            alert("Enter Car Model")
        else if (!carDesc)
            alert("Enter Car Description")
        else if (!price)
            alert("Enter Car Price")
        else {
            const filedata = new FormData()
            filedata.append("file", file)
            filedata.append("carname", carModel)
            filedata.append("cardesc", carDesc)
            filedata.append("price", price)

            uploadImage(filedata).then((result) => console.log(result?.data)).catch((error) => console.log(error?.response?.data))
            getImages().
                then((data) => {
                    dispatch(getallimages(data?.data))
                })
                .catch((error) => console.log(error.message))
            setImageUploadPage(false)
        }
    }
    return (
        <div className="ImageUploadDiv">
            <p className="X-sign" onClick={() => setImageUploadPage(false)}>X</p>
            <div className="ImageUploadDiv1">
                <div className="uploaddiv2"><p className="uploaddiv3">Upload a new Car</p></div>
                <label>Upload Car Image:</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}></input>
                <label>Enter Car Model:</label>
                <input type="text" placeholder="Enter Car Model" onChange={e => setCarModel(e.target.value)} />
                <label>Enter Car Description:</label>
                <textarea placeholder="Enter Car Description" onChange={e => setCarDesc(e.target.value)}></textarea>
                <label>Enter Price:</label>
                <input type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)} />
                <button type="button" onClick={uploadCarDetails}>Submit</button>
            </div>
        </div>
    )
}

export default ImageUpload