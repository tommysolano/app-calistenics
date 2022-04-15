import React, { useState, useContext } from 'react';
import { authContext } from "../context/authContext"
import { NavLink } from "react-router-dom"
import PublictNavbar from "../components/publicNavbar"
import "../public/css/register/register.css"


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

    if (formInputs.email === "" || formInputs.password === "" || formInputs.name === "") {
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

      if (result.error) {
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
      <PublictNavbar />
      <div className="container_reg">
        <div className="position_reg">
          <p>Sing Up and Start Workout</p>
          <form onSubmit={handleSubmit}>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Name"
              value={formInputs.name}
              onChange={handleInputChange}
            /> <br /> <br />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formInputs.email}
              onChange={handleInputChange}
            /> <br /> <br />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formInputs.password}
              onChange={handleInputChange}
            /> <br /> <br />

            <input type="submit" value="Register" className="btn_reg"/>
          </form>
          <div className="container_login_acc">
            <p className="text_reg">Already Have an account</p>
            <NavLink to="/login" className="reg_acc">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;