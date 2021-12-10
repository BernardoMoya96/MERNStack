import React, {useEffect, useState, useContext} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import { DataContext } from '../context/DataContext'
import Login from './Login'
import Home from '../components/Home'

const ProtectedRoute= ()=>{
    const {isAuth} = useContext(DataContext);
     useEffect(() => {
      console.log("Is Auth: " + isAuth)
   }, [isAuth]);

    return(
        isAuth ? <Home/>: <Navigate to="/login"/>    
    )
}
export default ProtectedRoute