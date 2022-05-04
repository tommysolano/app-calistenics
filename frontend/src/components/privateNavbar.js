import React, { useContext }  from 'react'
import { NavLink } from "react-router-dom"
import { authContext } from "../context/authContext"
import "../public/css/privateNavbar/privateNavbar.css"


export default function Navbar () {

  const { setAuth } = useContext(authContext)

  const handleLogout = () => {
    setAuth({
      auth: false,
      token: null
    })
    localStorage.setItem("token", "")
  }

    return (
        <div className="privatenavbar">
            <div className="container_calistenics_private">
                <NavLink to="/" className="calistenics_private">CALISTHENICS APP</NavLink>
            </div>
            <button onClick={handleLogout} className="logout">Cerrar sesión</button>
        </div>
    )
}