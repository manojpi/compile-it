import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CodeEditor from './pages/CodeEditor';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/homepage" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path = "/dashboard" element={<Dashboard/>}/>
        <Route path = "/editor" element={<CodeEditor/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
