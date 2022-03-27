import { BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
      <Route path="/" element={<Homepage/>}/> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="*" element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
