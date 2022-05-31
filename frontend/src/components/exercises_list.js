import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { useParams } from 'react-router-dom'
import Axios from 'axios'


function ExercisesList() {


    let { exercisesListTitleParams } = useParams();

    const [exercisesListTitle, setExercisesListTitle] = useState("")
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

    //const arrayExercisesListTitle = Object.keys(exercisesListTitle)

    //console.log(exercisesListTitle)
    console.log(exercisesListTitle[exercisesListTitleParams])
    //console.log(arrayExercisesListTitle)

    return (
        <div>
            <p>{exercisesListTitleParams}</p>
        </div>
    )
}

export default ExercisesList