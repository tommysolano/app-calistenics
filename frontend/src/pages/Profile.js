import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import Axios from 'axios'
import PrivateNavbar from "../components/privateNavbar"

function Profile() {

  const [user, setUser] = useState("")
  const [exercises, setExercises] = useState("")
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


    // obtengo la data de los ejercicios
    useEffect(() => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/exercises",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token
        }
      }).then((res) => {
        setExercises(res.data.ejercicios[0])
      })
        .catch((err) => console.log(err))
    },[])
    
    console.log(exercises)
  
    const arrayExercises = Object.keys(exercises) 

    return (
      <div>
        <PrivateNavbar/>
        <p>Welcome, {user.username}</p>
        <div className="container_exercises">
          {arrayExercises.map((value, index) => { return <div key={index}>{value}</div> })}
        </div>
      </div>
    );
  }
  
  export default Profile;