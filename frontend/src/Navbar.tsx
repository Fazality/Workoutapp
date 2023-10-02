import './Nav.css'
import './expertaLogo.jpg'

function Navbar(){
    return(
        <>
            <div className="header">
                <div className='topOfHeader'>
                    <img id='logo' src='src/expertaLogo.jpg'></img>
                </div>
                <div className='navbarBottom'>
                    <link className='navbarButton'>
                        <h5 className='buttonText'>Profile</h5>
                    </link>
                    <link className='navbarButton'>
                        <h5 className='buttonText'>Workout</h5>
                    </link>
                    <link className='navbarButton'>
                        <h5 className='buttonText'>Excercise</h5>
                    </link>
                    <link className='navbarButton'>
                        <h5 className='buttonText'>Chat</h5>
                    </link>
                </div>
            </div>
        </>
    )
}

export default Navbar