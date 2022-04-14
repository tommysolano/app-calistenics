import React  from 'react'
import PublictNavbar from "../components/publicNavbar"
import { NavLink } from "react-router-dom"
import "../public/css/homepage/homepage.css"

function Homepage() {
    return (
      <div>
        <PublictNavbar/>
        <div className="container_home">
          <div className="cover_home"></div>
          <div className="container_content_home">
            <div className="container_text_home">
              <div className="container_pain">
                <p>PAIN IS JUST WEAKNESS LEAVING YOUR BODY</p>
              </div>
              <div className="container_btn_start">
                <NavLink to="/register" className="start_now">START NOW</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Homepage;