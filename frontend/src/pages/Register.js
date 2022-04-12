import { useState, useContext } from 'react';
import { authContext } from "../context/authContext"


function Register() {

  const { setAuth } = useContext(authContext) // verifica si ha iniciado sesión

  const [formInputs, setFormInputs] = useState({ // el estado del formulario que se enviará al servidor
    username: "",
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

    if(formInputs.email === "" || formInputs.password === "" || formInputs.name === "") {
      return alert("Los campos no deben ir vacios")
    }

    const data = {
      username: formInputs.name,
      email: formInputs.email,
      password: formInputs.password,
    }

    try {
      
      const resp = await fetch("http://localhost:5000/api/signup", {
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

    } catch (error) {
      
      console.log("error: ", error)

    }
  }


    return (
      <div>
        <p>Login</p>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label><br/>
        <input
          type="name"
          id="name"
          name="name"
          value={ formInputs.name }
          onChange={ handleInputChange }
        /> <br/>

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

        <input type="submit" value="Register"/>
      </form>
      </div>
    );
  }
  
  export default Register;