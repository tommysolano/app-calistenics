import { useState, useContext } from "react"
import { authContext } from "../context/authContext"
import Axios from 'axios'

function Profile() {

  const [user, setUser] = useState("")
  const { setAuth } = useContext(authContext)

  //const token = localStorage.getItem('token');

  const handleLogout = () => {
    setAuth({
      auth: false,
      token: null
    })
    localStorage.setItem("token", "")
  }


  Axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:5000/api/user",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    console.log(res)
  })
    .catch((err) => console.log(err))
    
  

    return (
      <div>
        <p>Profile</p>
        <p>{user}</p>
        <button onClick={handleLogout} >Logout</button>
      </div>
    );
  }
  
  export default Profile;