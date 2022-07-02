import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../context/authContext"
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import Axios from 'axios'
import "./../public/css/exercises_list/exercise_list.css"


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

    // al invocar el objeto primero nos dara undefine para evitar errores con Object.entries encerramos la operacion dentro de un if de modo
    // que no nos permita usar exercisesListTitle[exercisesListTitleParams] a no ser que su valor sea distinto a undefined

    if (exercisesListTitle[exercisesListTitleParams] !== undefined) {
        arrayExercisesList = Object.entries(exercisesListTitle[exercisesListTitleParams])
    }


    return (
        <div className="container_exercises_list">
            <div className="title_exercise_list">
                <h2>{exercisesListTitleParams}</h2>
            </div>
            <div className="container_list_exercises_id">
                {arrayExercisesList.map(([key, value], index) => { /* mapeo el array con los ejercicios, separo el key que sera el nombre del ejercicio, el value donde estara el link de la imagen y el index el cual es el identificador que cada componente hijo debe llevar */
                    let img = Object.entries(value) /* tranformo value de un objeto a un array */
                    return <NavLink to={`${key}`} key={index}>
                        <div className="list_exercise_id">
                            <div className="list_exercise_id_img">
                                <img src={img[0][1]} alt="" />
                            </div>
                            <div className="list_exercise_id_color">
                            </div>
                            <div className="list_exercise_id_title">
                                <p>{key}</p>
                            </div>
                        </div>
                    </NavLink>
                })}
            </div>
        </div>
    )
}

export default ExercisesList