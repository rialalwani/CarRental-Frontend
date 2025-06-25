import { createContext, useContext, useEffect, useRef ,useState} from "react";
import { io } from "socket.io-client";
import { getFcmToken } from "./Notifications/firebase-messaging.js";

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
    const socket = useRef(null)
    const [token,setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        getFcmToken().then(fcmToken => {
            socket.current = io("http://localhost:5000", {
                auth: {
                    token:token,
                    fcmToken: fcmToken
                }
            })
        })
    }, [token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)