import {Routes,Route} from "react-router-dom"
import './App.css';
import Home from "./componets/Home";
import Login from './componets/users/Login';
import Signup from "./componets/users/Signup";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    </div>
  );
}

export default App;
