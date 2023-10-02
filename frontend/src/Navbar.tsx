import './Nav.css'
import './expertaLogo.PNG'

function Navbar(){
    return(
        <>
            <div className="header">
                <div className='topOfHeader'>
                    <img className='logo' src='./expertaLogo.PNG'></img>
                </div>
                <div className='navbarBottom'>
                    <a className='navbarButton'>
                        <h5 className='buttonText'>Profile</h5>
                    </a>
                    <a className='navbarButton'>
                        <h5 className='buttonText'>Workout</h5>
                    </a>
                    <a className='navbarButton'>
                        <h5 className='buttonText'>Excercise</h5>
                    </a>
                    <a className='navbarButton'>
                        <h5 className='buttonText'>Chat</h5>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar