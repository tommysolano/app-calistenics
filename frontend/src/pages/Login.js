import {useNavigate} from "react-router-dom"
import {useRef} from "react"
import Axios from 'axios'


function Login() {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  let navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      
      withCredentials: true,
      url: "http://localhost:5000/api/signin",
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
        <p>Login</p>
        <form onSubmit={handleSubmit}>
        <label for="email">Email</label><br/>
        <input type="email" id="email" name="email" ref={emailRef} /><br/>
        <label for="password">Password</label><br/>
        <input type="password" id="password" name="password" ref={passwordRef}></input><br/><br/>
        <input type="submit" value="Login"/>
      </form>
      </div>
    );
  }
  
  export default Login;