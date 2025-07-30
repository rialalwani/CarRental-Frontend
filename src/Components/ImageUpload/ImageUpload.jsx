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
                <input type="file" id="fileInput" accept=".png,.jpg,.jpeg,.webp" onChange={e => setFile(e.target.files[0])} style={{display:"none"}}></input>
                <label htmlFor="fileInput" style={{
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '10px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    border:"1px solid gray"
                  }}>{file?.name || "Choose Image"}</label>
                <label>Enter Car Model:</label>
                <input type="text" placeholder="Enter Car Model" onChange={e => setCarModel(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}} />
                <label>Enter Car Description:</label>
                <textarea placeholder="Enter Car Description" onChange={e => setCarDesc(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}}></textarea>
                <label>Enter Price:</label>
                <input type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)} style={{background:"black",color:"white",border:"1px solid gray"}}/>
                <button type="button" onClick={uploadCarDetails} style={{background:"darkseagreen"}}>Submit</button>
            </div>
        </div>
    )
}

export default ImageUpload