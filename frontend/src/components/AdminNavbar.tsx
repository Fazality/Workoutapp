import "../assets/expertaLogo.jpg"
import "../assets/profilePage.jpg"
import "../assets/workoutPage.jpg"
import "../assets/excercisePage.jpg"
import react from 'react'

import { Link } from "react-router-dom"

const AdminNavbar: React.FC = () =>{
    return(
        <>
            <div className="adminHeader">
                <div className='topOfHeader'>
                    <img className='logo' src='src/assets/expertaLogo.jpg'></img>
                    <h1 className="adminTitle">ADMIN PAGE!</h1>
                </div>
                <div className='navbarBottom'>
                    <Link to={"/"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/profilePage.jpg"></img>
                        <h5 className='buttonText'>Users</h5>
                    </Link>
                    <Link to={"/workout"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/workoutPage.jpg"></img>
                        <h5 className='buttonText'>Workouts</h5>
                    </Link>
                    <Link to={"/excercise"} className='navbarButton'>
                        <img className="navbarPicture" src="src/assets/excercisePage.jpg"></img>
                        <h5 className='buttonText'>Excercises</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar
