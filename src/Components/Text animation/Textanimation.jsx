import "./Textanimation.css"
import {motion} from "framer-motion"
function Textanimation() {
    const texts=["The freedom of the road - just a click away!","Drive the Experience","Rent-Ride-Repeat","Your Ride,Your Rules"]
    return (
        <div className="animationdiv">
            {texts.map((text,index)=>(
                <motion.div
                className="animation"
                initial={{
                    opacity: 0,
                    x:  0
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
                <p className="text">{text}</p>
            </motion.div>
        ))}
        </div>
    )
}

export default Textanimation