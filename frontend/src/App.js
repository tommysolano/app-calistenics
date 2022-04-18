import React  from 'react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import { useContext } from "react"
import { authContext } from "./context/authContext"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import Profile from "./pages/Profile"
import Footer from "./components/footer"
import "./public/css/appStyles/appStyles.css"

function App() {

  const { auth } = useContext(authContext)

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={!auth.auth ? <Homepage/> : <Navigate to="/profile" replace />}/>
        <Route path="/register" element={ !auth.auth ? <Register/> : <Navigate to="/profile" replace />}/>
        <Route path="/login" element={ !auth.auth ? <Login /> : <Navigate to="/profile" replace /> } />
        <Route path="/profile" element={ auth.auth ? <Profile />  : <Navigate to="/" replace /> } />
        <Route path="*" element={<Notfound/>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
