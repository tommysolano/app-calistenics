import React, { useState, useContext } from 'react';
import { authContext } from "../context/authContext"
import { NavLink } from "react-router-dom"
import PublictNavbar from "../components/publicNavbar"
import "../public/css/login/login.css"

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

    if (formInputs.email === "" || formInputs.password === "") {
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

      if (result.error) {
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
      <PublictNavbar />
      <div className="container_login">
        <div className="position_login">
          <p>Login in your Calistenic Account!</p>
          <form onSubmit={handleSubmit} >
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              value={formInputs.email}
              onChange={handleInputChange}
            /> <br />

            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formInputs.password}
              onChange={handleInputChange}
            /> <br /> <br />

            <input type="submit" value="Login" className="btn_login" />
          </form>
          <div className="container_create_acc">
            <p className="text_acc">Don't have an account?</p>
            <NavLink to="/register" className="create_acc">Create Account</NavLink>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Login