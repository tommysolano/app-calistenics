import React, { useContext}  from 'react'
import { Navigate } from "react-router-dom"
import { authContext } from "../context/authContext"
import PublictNavbar from "../components/publicNavbar"
import { NavLink } from "react-router-dom"
import "../public/css/homepage/homepage.css"



function Homepage() {

  const { auth } = useContext(authContext) // verifica si ha iniciado sesión

  if (auth.auth) {
    return <Navigate to="/profile" replace/>
  }

    return (
      <div>
        <PublictNavbar/>
        <div className="container_home">
          <div className="cover_home"></div>
          <div className="container_content_home">
            <div className="container_text_home">
              <div className="container_pain">
                <p>EL DOLOR SÓLO ES LA DEBILIDAD ABANDONANDO TU CUERPO</p>
              </div>
              <div className="container_btn_start">
                <NavLink to="/register" className="start_now">EMPEZAR AHORA</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Homepage;