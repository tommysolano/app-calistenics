import { useState, useContext } from 'react';
import { authContext } from "../context/authContext"

function Login() {

  const { setAuth } = useContext(authContext) // verifica si ha iniciado sesión


  const [formInputs, setFormInputs] = useState({ // el estado del formulario que se enviará al servidor
    email: "",
    password: ""
  })

  const handleInputChange = e => { // ingresa los valores en el formulario
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(formInputs.email === "" || formInputs.password === "") {
      return alert("Los campos no deben ir vacios")
    }

    const data = {
      email: formInputs.email,
      password: formInputs.password
    }

    try {

      const resp = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await resp.json()

      if (result.error){
        return alert(result.message)
      }

      localStorage.setItem("token", JSON.stringify(result.token))

      setAuth({
        auth: true,
        token: result.token
      })

    } catch (err) {
      console.log("Error: ", err)
    }
  }

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label><br/>
        <input
          type="email"
          id="email"
          name="email"
          value={ formInputs.email }
          onChange={ handleInputChange }
        /> <br/>

        <label htmlFor="password">Password</label><br/>
        <input
          type="password"
          id="password"
          name="password"
          value={ formInputs.password }
          onChange={ handleInputChange }
        /> <br/> <br/>

        <input type="submit" value="Login"/>
      </form>
    </div>
  )

}

export default Login