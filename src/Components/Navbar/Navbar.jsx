import "./Navbar.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { log_out } from "../../Counter/counterslice.js";

function Navbar() {
    const [showdrawersidebar, setshowdrawersidebar] = useState(false);
    const toggledrawersidebar = () => {
        console.log("clicked")
        if (showdrawersidebar)
            setshowdrawersidebar(false)
        else
            setshowdrawersidebar(true)
    }
    const user = useSelector(state => state.userreducer)
    const dispatch = useDispatch()
    console.log(showdrawersidebar)
    const logout = () => {
        dispatch(log_out())
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            logout()
        }, 3600000)//1hr

        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            <nav className="verticalNav navbar navbar-expand-md  pt-3" style={{ width: "100%"}}>
                <a className="navbar-brand brand-name ms-md-5 ms-sm-4 ms-2 text-white logo" href="#">AMR WHEELS</a>
                <button className="navbar-toggler position-relative" type="button" onClick={e => toggledrawersidebar()}>
                    <span className="navbar-toggler-icon" style={{color:"white"}}></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ms-5 text-white">
                        <li className="nav-item active ps-5">
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item ps-2">
                            {user?.email ?
                                <button className="nav-link  text-white" onClick={logout}>Logout</button>
                                :
                                <Link className="nav-link text-white" to="/login">Login/SignUp</Link>
                            }
                        </li>
                        <li className="nav-item ps-2">
                            {user?.role == "owner" ?
                                <Link to="/allbookings"className="nav-link text-white">Bookings</Link>
                                :
                                <Link to="/mybookings" className="nav-link text-white">My Bookings</Link>}
                        </li>
                        <li className="nav-item ps-2">
                            <a className="nav-link text-white" href="#">Policies</a>
                        </li>
                        <li className="nav-item ps-2">
                            <a className="nav-link text-white" href="#">Help & Support</a>
                        </li>
                    </ul>
                </div>
                {showdrawersidebar &&
                    <div className=" horizontalNav position-absolute top-50 mt-4 end-0" style={{ zIndex: 2}}>
                        <ul className="nav flex-column ms-0">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link  text-black" >Home</Link>
                            </li>
                            <li className="nav-item">
                                {user?.email ?
                                    <button className="nav-link" onClick={logout}>Logout</button>
                                    :
                                    <Link to="/login" className="nav-link  text-black">Login/SignUp</Link>
                                }
                            </li>
                            <li className="nav-item">
                                {user?.role == "owner" ?
                                    <Link to="/allbookings" className="nav-link text-black">Bookings</Link>
                                    :
                                    <Link to="/mybookings" className="nav-link text-black">My Bookings</Link>}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Policies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#">Help & Support</a>
                            </li>
                        </ul></div>
                }
            </nav>
        </div>
    )
}

export default Navbar