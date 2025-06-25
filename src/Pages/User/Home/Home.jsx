import "./Home.css"
import Carousel from 'react-bootstrap/Carousel';
import Textanimation from "../../../Components/Text animation/Textanimation";
import { motion } from "framer-motion"
import Card from 'react-bootstrap/Card';
import { IoCarSportOutline } from "react-icons/io5";
import { FcPlanner } from "react-icons/fc";
import { TiTickOutline } from "react-icons/ti"
import { IoChatbubblesOutline } from "react-icons/io5";
import Cars from "../../../Components/Cars/Cars.jsx"
import { useSelector } from "react-redux";
import ImageUpload from "../../../Components/ImageUpload/ImageUpload.jsx"
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

function Home() {
    const contenttext = ["Looking for a hassle-free car rental experience?", "We offer a wide range of well-maintained vehicles at unbeatable prices", "Whether you need a compact car for city travel, an SUV for a road trip, or a luxury ride for a special occasion", "We’ve got you covered!"]
    const role=useSelector(state=>state.userreducer)?.role
    const [imageUploadPage,setImageUploadPage]=useState(false)
    


    //console.log(role)

    const cards=[
        {
           title:"Wide Selection of Vehicles",
           text:"From budget-friendly cars to premium luxury models.",
           icon:<IoCarSportOutline/>,
           color:"darkkhaki"
        },
        {
            title:" Flexible Rental Plans",
            text:" Daily, weekly, or monthly options tailored to your needs.",
            icon:<FcPlanner/>,
            color:"orange"
        },
        {
            title:" Easy Booking Process",
            text:" Rent a car in just a few clicks!",
            icon:<TiTickOutline/>,
            color:"green"
        },
        {
            title:"24/7 Customer Support",
            text:"Assistance whenever you need it.",
            icon:<IoChatbubblesOutline/>,
            color:"cornflowerblue"
        }
]
    return (
        <div className="Homepage">
            <div className="dashboard">
                <Carousel>
                    <Carousel.Item>
                        <img src="/dashboard.jpg" style={{zIndex:1}}></img>
                        <Carousel.Caption>
                            <Textanimation />
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="Content container">
                {contenttext.map((text, index) => (
                    <motion.div
                        className="animation2"
                        initial={{
                            opacity: 0,
                            x: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 50, // Slide in to its original position
                            transition: {
                                duration: 1 // Animation duration
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        <p>{text}</p>
                    </motion.div>
                ))}
            </div>

            <div className="Features">
                {cards.map((card)=>(
                     <Card style={{ width: '18rem',borderBottom:`3px solid ${card?.color}` }} className="card">
                     <Card.Body>
                       <Card.Title style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
                        <div style={{color:card.color}}>{card.icon}</div>
                        <b className="card-title">{card.title}</b>
                        </Card.Title>
                       <Card.Text>
                         {card.text}
                       </Card.Text>
                     </Card.Body>
                   </Card>
                ))}
            </div>
            {role=="owner"?
             <div className="owner-car-div">
                <h4 className="owner-car-div-heading">MY CARS</h4>
                <Cars></Cars>
                <Link to="allcars" className="car-links">See More</Link>
                <button type="button" onClick={()=>setImageUploadPage(true)} className="upload-car">Upload new Car</button>
                 {imageUploadPage && <ImageUpload setImageUploadPage={setImageUploadPage}/>}
            </div>
            :
            <div style={{marginTop:"4rem"}}>
                <Cars></Cars>
                <Link to="/allcars" className="car-links">See More</Link>
            </div>
            }
        </div>
    )
}

export default Home