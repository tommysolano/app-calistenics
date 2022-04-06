import {useNavigate} from "react-router-dom"
import {useRef} from "react"
import Axios from 'axios'


function Register() {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const nameRef = useRef(null)
  let navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value
      },
      
      withCredentials: true,
      url: "http://localhost:5000/api/signup",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      navigate("/profile", { replace: true })
    })
      .catch((err) => console.log(err))
  }

    return (
      <div>
        <p>Register</p>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br/>
        <input type="name" id="name" name="name" ref={nameRef}/><br/>
        <label htmlFor="email">Email</label><br/>
        <input type="email" id="email" name="email" ref={emailRef}/><br/>
        <label htmlFor="password">Password</label><br/>
        <input type="password" id="password" name="password" ref={passwordRef}></input><br/><br/>
        <input type="submit" value="Register"/>
      </form>
      </div>
    );
  }
  
  export default Register;