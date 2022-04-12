import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import { useContext } from "react"
import { authContext } from "./context/authContext"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"

function App() {

  const { auth } = useContext(authContext)

  console.log(auth)

  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={ !auth.auth ? <Register/> : <Navigate to="/profile" replace />}/>
        <Route path="/login" element={ !auth.auth ? <Login /> : <Navigate to="/profile" replace /> } />
        <Route path="/profile" element={ auth.auth ? <Profile />  : <Navigate to="/" replace /> } />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
