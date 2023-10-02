// import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import "./components/Navbar.css"

import ProfilePage from "./components/body/profilePage.tsx"
import WorkoutPage from "./components/body/workoutPage.tsx"
import ExcercisePage from "./components/body/excercisePage.tsx"
import ChatPage from "./components/body/chatPage.tsx"

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" Component={ProfilePage}/>
        <Route path="/workout" Component={WorkoutPage}/>
        <Route path="/excercise" Component={ExcercisePage}/>
        <Route path="/chat" Component={ChatPage}/>
      </Routes>
    </Router>
  )
}

export default App
