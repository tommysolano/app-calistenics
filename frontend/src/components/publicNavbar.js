import React  from 'react'
import { NavLink } from "react-router-dom"
import "../public/css/publicNavbar/publicNavbar.css"

export default function Navbar () {
    return (
        <div className="publicnavbar">
            <div className="container_calistenics">
                <NavLink to="/" className="calistenics">CALISTENICS APP</NavLink>
            </div>
            <ul className="container_logreg">
                <li>
                    <NavLink to="/login" className="logreg login">Login</NavLink>
                </li>
                <li className="register">
                    <NavLink to="/register" className="logreg">Register</NavLink>
                </li>
            </ul>
        </div>
    )
}