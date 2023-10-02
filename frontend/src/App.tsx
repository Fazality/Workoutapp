import { useState } from 'react'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './containers/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" Component={ProfilePage}/>
        <Route path="/" Component={WorkoutPage}/>
        <Route path="/" Component={ExcercisePage}/>
        <Route path="/" Component={ChatPage}/>
      </Routes>
    </>
  )
}

export default App
