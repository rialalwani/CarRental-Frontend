import { createContext, useContext, useEffect, useRef ,useState} from "react";
import { io } from "socket.io-client";
import { getFcmToken } from "./Notifications/firebase-messaging.js";

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
    const socket = useRef(null)
    const token = localStorage.getItem("token")

    useEffect(() => {
        getFcmToken().then(fcmToken => {
            if(!socket.current)
            {
            socket.current = io("https://carrental-backend-dvnk.onrender.com/", {
                auth: {
                    token:token,
                    fcmToken: fcmToken
                }
            })
        }})

         return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)