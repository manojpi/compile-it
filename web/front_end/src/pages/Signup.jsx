import React, { useState } from 'react'
import "./Signup.css"
import {Link, useNavigate} from "react-router-dom";
import Navigation from '../components/Navigation';


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const [fetchMessage, setFetchMessage] = useState('');

  function handleSignup(e){
    e.preventDefault();
    if (password !== repassword){
      alert("Password mismatch")
      return;
    }
    const user = {email:email, password:password, name:name}
    fetch("http://localhost:5001/api/register",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
				'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then((body)=>{
      if(body.status === 400){
        alert(body.message)
      }
      else{
        console.log(body.message);
        setFetchMessage(body.message);
        setTimeout(() => {
          setFetchMessage('')
        }, 1500);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    })
   }
  

  return (
    <>
    <Navigation/>
    <div className='container'>
    <div className='row'>
    <div className='col col-md-5 signup__bg'></div>
    <div className='col col-md-7 d-flex align-items-center justify-content-center flex-direction-colums'>
      <form className='form-style' onSubmit={handleSignup}>
      <div className="mb-3">
          <label for="exampleInputName" className="form-label">User Name</label>
          <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder='John Doe' onChange={e => setName(e.target.value)} value={name} required/>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='@example.com' onChange={e => setEmail(e.target.value)} value={email} required/>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword" onChange={e => setPassword(e.target.value)} value={password} required />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword2" className="form-label">Re-enter Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setRePassword(e.target.value)} value={repassword} required/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        {fetchMessage && <h6 className="my-3">{fetchMessage}</h6>}
        <div className='py-4'>
          <p className='text-center'>
            Already have an account <Link to="/login">Login</Link>
          </p>

        </div>
    </form>
    </div>
    </div>
  </div>
  </>
  )
}

export default Signup