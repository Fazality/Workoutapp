// import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import "./components/Navbar.css"

import AdminNavbar from "./components/AdminNavbar"
import "./components/AdminNavbar.css"

import ProfilePage from "./containers/profilePage.tsx"
import "./containers/profilePage.css"
import WorkoutPage from "./containers/workoutPage.tsx"
import ExcercisePage from "./containers/excercisePage.tsx"
import ChatPage from "./containers/chatPage.tsx"

function App() {

  return (
    <Router>
      <Navbar/>
      <AdminNavbar/>
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
