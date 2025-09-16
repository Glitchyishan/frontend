import React from 'react'
import Home from './pages/home'
import { ToastContainer, toast } from 'react-toastify';
import {Navigate,Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/signup';
const  App = () => {
  return (
    <div >
  <ToastContainer/>
  <Routes>
    <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
       <Route path='/' element={<Navigate to="/login"/>}/>
  </Routes>
    </div>
  )
}

export default  App