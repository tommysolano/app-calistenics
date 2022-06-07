import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { useParams } from 'react-router-dom'
import Axios from 'axios'


function ExercisesList() {


    let { exercisesListTitleParams } = useParams();

    const [exercisesListTitle, setExercisesListTitle] = useState({})
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
            setExercisesListTitle(res.data.ejercicios[0])
        })
            .catch((err) => console.log(err))
        
    }, []) 

    // creamos una nueva variable donde va a estar almacenado la informacion que traemos de la api junto con el param
    let arrayExercisesList = []

    // al invocar el objeto primero nos dara undefine para evitar errores con Object.keys encerramos la operacion dentro de un if de modo
    // que no nos permita usar exercisesListTitle[exercisesListTitleParams] a no ser que su valor sea distinto a undefined
    if (exercisesListTitle[exercisesListTitleParams] !== undefined) {
        arrayExercisesList = Object.keys(exercisesListTitle[exercisesListTitleParams])
    }
    
    
    return (
        <div>
            <p>{exercisesListTitleParams}</p>
            {arrayExercisesList.map((value, index) => 
                { return <li key={index}>{value}</li>
                })}
        </div>
    )
}

export default ExercisesList