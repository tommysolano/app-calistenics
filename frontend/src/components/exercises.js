import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { NavLink } from "react-router-dom"

import Axios from 'axios'
import "../public/css/exercises/exercises.css"


function Exercises() {

    const [exercises, setExercises] = useState("")
    const { auth } = useContext(authContext)


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
    }, [])

    const arrayExercises = Object.keys(exercises)


    return (
        <div className="container_exercises">
            <div className="title_exercise">
                <h2>EJERCICIOS</h2>
            </div>
            <div className="container_exercises_list">
                {arrayExercises.map((value, index) => 
                { return <NavLink to={`/profile/${value}`} key={index}>
                    <div className="container_exercise">
                        <div className="exercise_background_img" id={"img_"+index}></div>
                        <div className="exercise_background_color">
                            <p>{value}</p>
                        </div>
                </div>
                </NavLink> })}
            </div>
        </div>
    )
}

export default Exercises