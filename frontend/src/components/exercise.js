import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import "../public/css/exercise/exercise.css"


function Exercise() {

    let { exercisesListTitleParams } = useParams(); // obtengo el parametro de la categoria del ejercicio
    let { exercise } = useParams(); // obtengo el parametro del ejercicio


    const [exerciseId, setExerciseId] = useState({});
    const { auth } = useContext(authContext)

    let dataExercise = []

    let description = ""
    let images = []
    let tutorial = ""


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
            setExerciseId(res.data.ejercicios[0])
        })
            .catch((err) => console.log(err))

    }, [])

    
    // pregunto si exerciseId[exercisesListTitleParams] (es el objeto que contiene la informacion del ejercicio que se quiere revisar) es distinto de undefined en caso de ser verdad lo tranformo en un array dentro de la variable dataExercise
    if (exerciseId[exercisesListTitleParams] !== undefined) {
        dataExercise = Object.entries(exerciseId[exercisesListTitleParams][exercise])
        // guardamos la informacion del array en nuevas variables para poder itulizarlas
        description = dataExercise[3][1]
        images = dataExercise[1][1]
        tutorial = dataExercise[2][1]
    }


    console.log(dataExercise)


    return (
        <div className="container_exercise_id">
            <div className="title_exercise_id">
                <h2>{exercise}</h2>
            </div>
            <div className="container_info_exercise_id">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Exercise