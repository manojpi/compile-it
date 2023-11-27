import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [fetchMessage, setFetchMessage] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const user = { email: email, password: password }
    fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then((body) => {
      if (body.success === false) {
        setFetchMessage(body.message);
        setTimeout(() => {
          setFetchMessage('')
        }, 1500);
      }
      else {
        localStorage.setItem("Token", body.token);
        setFetchMessage(body.message);
        setTimeout(() => {
          setFetchMessage('')
        }, 1500);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    })
  }

  return (
    <>
      <Navigation />
      <div className='container'>
        <div className='row'>
          <div className='col col-md-5 login__bg'></div>
          <div className='col col-md-7 d-flex align-items-center justify-content-center flex-direction-colums'>
            <form className='form-style' onSubmit={handleLogin}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='@example.com' onChange={e => setEmail(e.target.value)} value={email} required />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword" onChange={e => setPassword(e.target.value)} value={password} required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
              {fetchMessage && <h6 className="my-3">{fetchMessage}</h6>}
              <div className='py-4'>
                <p className='text-center'>
                  Don't have an account ? <Link to="/signup">Signup</Link>
                </p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login
