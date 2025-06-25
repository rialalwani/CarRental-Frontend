import {jwtDecode} from "jwt-decode"

export const getUserRole=()=>{
    const token=localStorage.getItem("token")
    const decoded=jwtDecode(token)
    return (decoded?.userType)
}