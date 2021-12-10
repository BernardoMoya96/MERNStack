import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './components/Home'
import Header from './components/Header'
import Records from './components/Records'
import Modify from './components/Modify'
import { DataContext } from './context/DataContext'
import './App.css';
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {
   const [isAuth, setIsAuth] = useState(false);
   
   useEffect(()=>{
      console.log("Is Auth: "+isAuth)
   },[isAuth])
   return (      
      isAuth ? 
         <DataContext.Provider value={{ isAuth, setIsAuth }}>         
         <Router>
            <Header />
            <div className="main">
               <div>
                  <Routes>
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />                                          
                     <Route path="/modify" element={<Modify />} /> 
                     <Route path="/records" element={<Records />} />        
                     <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />                                                             
                     </Route>
                  </Routes>
               </div>
            </div>
         </Router>
      </DataContext.Provider>            
      : 
      <DataContext.Provider value={{ isAuth, setIsAuth }}>         
      <Router>
         <Header />
         <div className="main">
            <div>
               <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />                                                                                   
                  <Route element={<ProtectedRoute />}>
                     <Route path="/" element={<Home />} />    
                     <Route path="/modify" element={<Modify />} />
                     <Route path="/records" element={<Records />} />                                                             
                  </Route>
               </Routes>
            </div>
         </div>
      </Router>
   </DataContext.Provider>      
   )
}

export default App;