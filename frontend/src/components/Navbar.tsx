import "../assets/expertaLogo.jpg"
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
                        <h5 className='buttonText'>Profile</h5>
                    </Link>
                    <Link to={"/workout"} className='navbarButton'>
                        <h5 className='buttonText'>Workout</h5>
                    </Link>
                    <Link to={"/excercise"} className='navbarButton'>
                        <h5 className='buttonText'>Excercise</h5>
                    </Link>
                    <Link to={"/chat"} className='navbarButton'>
                        <h5 className='buttonText'>Chat</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
