import React from "react"
import { useParams } from 'react-router-dom'
import "../public/css/exercise/exercise.css"


function Exercise() {

    let { exercise } = useParams();

    console.log(exercise)

    return (
        <div className="container_exercise_id">
            <div className="title_exercise_id">
                <h2>{exercise}</h2>
            </div>
            <div className="container_info_exercise_id">
                
            </div>
        </div>
    )
}

export default Exercise