// import './Nav.css'
import './expertaLogo.jpg'
import react from 'react'

const Navbar: React.FC = () =>{
    // const style = { Inline css for later
    //     html:{
    //         margin:0,
    //         padding:0
    //     },
    //     body:{
    //         margin:0,
    //         padding:0
    //     },
    //     header: {
    //         position: "fixed",
    //         margin:0,
    //         marginTop:0,
    //         width:"100%",
    //         height:"auto",
    //         backgroundColor: "#C8C8C8",
    //         borderStyle:"solid",
    //         borderWidth:"2px",
    //         borderColor: "#4C943A"
    //     },
    //     topOfHeader: {
    //         float:"left",
    //         width:"100%",
    //         height:"auto",
    //         backgroundColor:"#FFFFFF",
    //         borderStyle:"solid",
    //         borderWidth:"2px",
    //         borderColor:"#44B7FF"
    //     },
    //     navbarButton: {
    //         float:"left",
    //         margin:"0.2em",
    //         margiLeft:"1em",
    //         width:"6em",
    //         height:"4em",
    //         textAlign: "center",
    //         borderStyle:"solid",
    //         borderWidth:"2px",
    //         borderRadius: "20px",
    //         borderColor: "#878787",
    //         transition: "0.2s",
    //     },
    //     "&:hover": {
    //         backgroundColor: "#E5E5E5",
    //         cursor: "pointer",
    //         textDecoration: "underline",
    //     },
    //     buttonText: {
    //         marginTop:"3.4em",
    //         fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    //     }
    // }
    return(
        <>
            <div className="header">
                <div className='topOfHeader'>
                    <img className='logo' src='src/expertaLogo.jpg'></img>
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