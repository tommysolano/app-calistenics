import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { NavLink, Outlet } from 'react-router-dom'
import Axios from 'axios'
import PrivateNavbar from "../components/privateNavbar"
import "../public/css/profile/profile.css"


function Profile() {

  const [user, setUser] = useState("")
  const { auth } = useContext(authContext)


    // obtengo la data del usuario
    useEffect(() => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/profile",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token
        }
      }).then((res) => {
        setUser(res.data)
      })
        .catch((err) => console.log(err))
    },[]) 

    return (
      <div>
        <PrivateNavbar/>
        <div className="container_profile">
          <p>Bienvenido, {user.username}</p>
          <br />
          <NavLink to="/profile">profile</NavLink>
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default Profile;