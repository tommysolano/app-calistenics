import {useNavigate} from "react-router-dom"
import {useState} from "react"
import Axios from 'axios'

function Profile() {

  const [user, setUser] = useState("")
  let navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/logout",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      navigate("/", { replace: true })
    })
      .catch((err) => console.log(err))
  }

  Axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:5000/api/user",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    setUser(res.data.name) 
  })
    .catch((err) => console.log(err))
    
  

    return (
      <div>
        <p>Profile</p>
        <p>{user}</p>
        <form onSubmit={handleSubmit}>
        <input type="submit" value="Logout"/>
        </form>
      </div>
    );
  }
  
  export default Profile;