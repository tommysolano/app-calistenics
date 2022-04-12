import { useState, useContext } from "react"
import { authContext } from "../context/authContext"
import Axios from 'axios'

function Profile() {

  const [user, setUser] = useState("")
  const { auth, setAuth } = useContext(authContext)


  const handleLogout = () => {
    setAuth({
      auth: false,
      token: null
    })
    localStorage.setItem("token", "")
  }


  //! se ejecuta de manera infinita, error 304 del servidor o del useState
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
    
  

    return (
      <div>
        <p>Profile</p>
        <p>{user.username}</p>
        <button onClick={handleLogout} >Logout</button>
      </div>
    );
  }
  
  export default Profile;