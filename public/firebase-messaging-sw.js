importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyANbJhotMq9vJ9O3AIF3o-LSFxRFDbZnu8",
  authDomain: "car-rental-68d5f.firebaseapp.com",
  projectId: "car-rental-68d5f",
  storageBucket: "car-rental-68d5f.firebasestorage.app",
  messagingSenderId: "820998440705",
  appId: "1:820998440705:web:900209321fa1fed437bd00",
  measurementId: "G-XZCK9305MW"
});

const messaging=firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./car.svg"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick",(e)=>{

     e.notification.close();
     const targetUrl="https://carrental-backend-dvnk.onrender.com/allbookings";

     e.waitUntil(
       clients.matchAll({type:"window",includeControlled:true})
       .then((clientList)=>{
         for (const client of clientList)
         {
            if(client.url===targetUrl && 'focus' in client)
            return client.focus
         }

         if(clients.openWindow) //open the tab if not already opened
        return client.openWindow(targetUrl)
       }
       )

     )

  })
});