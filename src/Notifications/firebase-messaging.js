import { initializeApp } from "firebase/app"
import { getMessaging, getToken as getFirebaseToken } from "firebase/messaging"

const firebaseConfig = {
    apiKey: "AIzaSyANbJhotMq9vJ9O3AIF3o-LSFxRFDbZnu8",
    authDomain: "car-rental-68d5f.firebaseapp.com",
    projectId: "car-rental-68d5f",
    storageBucket: "car-rental-68d5f.firebasestorage.app",
    messagingSenderId: "820998440705",
    appId: "1:820998440705:web:900209321fa1fed437bd00",
    measurementId: "G-XZCK9305MW"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export const getFcmToken = async () => {
    try {
        const permission = await Notification.requestPermission()
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((registration) => {
                /*console.log("SW registered:")*/});

                
                if (permission == "granted") {
                    const token = await getFirebaseToken(messaging, {
                        vapidKey: "BLEDg1fsooK9tzB5yYy96WttydT-x2oMXq6J2skRJf0x7_c-jzTFYWnqebner1oxe_qGmHvVaPgjbTftNHfFg78"
                    })
                    //console.log(token)
                    return token;
                }
                else {
                    //console.log("Permission denied")
                }
            }
    catch (error) {
            //console.log(error.message)
        }
    }