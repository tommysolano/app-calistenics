import React  from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { useContext } from "react"
import { authContext } from "./context/authContext"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import Profile from "./pages/Profile"
import Footer from "./components/footer"
import ProtectedRoute from './components/protectedRoute'
import ExercisesList from "./components/exercises_list"
import Exercises from "./components/exercises"
import "./public/css/appStyles/appStyles.css"

function App() {

  const { auth } = useContext(authContext)

  return (
    <BrowserRouter>

      <Routes>
        <Route index path="/" element={<Homepage/>} />
        <Route path="register" element={ <Register/>} />
        <Route path="login" element={ <Login /> } />
        <Route element={<ProtectedRoute user={auth.auth}/>}> {/* protegemos las rutas */}
          <Route path="profile" element={ <Profile /> }>
            <Route index element={ <Exercises/>} />
            <Route path=":exercisesListTitleParams" element={ <ExercisesList />} />
          </Route>
        </Route>
        <Route path="*" element={<Notfound/>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}


export default App;
