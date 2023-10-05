import "../assets/expertaLogo.jpg"
import "../assets/profilePage.jpg"
import "../assets/workoutPage.jpg"
import "../assets/excercisePage.jpg"
import "../assets/chatPage.jpg"
import react from 'react'

import { Link } from "react-router-dom"

const Navbar: React.FC = () =>{
    return(
        <>
            <div className="header">
                <div className='topOfHeader'>
                    <img className='logo' src='src/assets/expertaLogo.jpg'></img>
                </div>
                <div className='navbarBottom'>
                    <Link to={"/"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/profilePage.jpg"></img>
                        <h5 className='buttonText'>Profile</h5>
                    </Link>
                    <Link to={"/workout"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/workoutPage.jpg"></img>
                        <h5 className='buttonText'>Workout</h5>
                    </Link>
                    <Link to={"/excercise"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/excercisePage.jpg"></img>
                        <h5 className='buttonText'>Excercise</h5>
                    </Link>
                    <Link to={"/chat"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/chatPage.jpg"></img>
                        <h5 className='buttonText'>FAQ & Chat</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
