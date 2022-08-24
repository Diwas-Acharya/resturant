import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from './component/login';
import Signup from './component/signup';
import Dashboard from './component/dashboard';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<Login />} />
      <Route path="/sign-up" element = {<Signup />} />
      <Route path="/dashboard" element = {<Dashboard />} />
    </Routes>
  </>
  )
}

export default App;
