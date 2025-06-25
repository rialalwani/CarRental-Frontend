import axios from "axios"

const API=axios.create({
    baseURL:"http://localhost:5000", 
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ always gets the latest token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const sendotp=async(email)=>{
    return (await API.post("/user/sendotp",{email}))
}

export const verifyotp=async(data)=>{
    return (await API.post("/user/verifyotp",data))
}

export const login=async(data)=>{
    return (await API.post("/user/login",data))
}

export const forgetPassword=async(email)=>{
    return (await API.post("/forget-password/sendotp",{email}))
}

export const submitotp=async(data)=>{
    return (await API.post("/forget-password/verifyotp",data))
}

export const resetPassword=async(data)=>{
   return (await API.post("/forget-password/reset-password",data))
}

export const uploadImage=async(data)=>{
    return (await API.post("/cars/uploadimage",data))
}

export const getImages=async()=>{
    return (await API.get("/cars/getimages"))
}

export const getUserBookings=async()=>{
    return (await API.get("/bookings/mybookings"))
}

export const updateImageData=async(data)=>{
    return (await API.put("/cars/updateImageData",data))
}

export const updateImage=async(data)=>{
    return (await API.put("/cars/updateImage",data))
}

export const deleteImage=async(data)=>{
    return (await API.delete("/cars/deleteImage",{data}))
}

export const updateAvailability=async(data)=>{
    return (await API.put("/cars/updateAvailability",data))
}