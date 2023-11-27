import React from 'react';
import { useState, useEffect } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useNavigate } from "react-router-dom";




function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("Token");
     window.location.replace("/");
  }

  const token = localStorage.getItem("Token");
  const decodedToken = decodeToken(token);


  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!isExpired(token)) {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-sm bg-white sticky-top">
      <div className="container-fluid ms-3">
        <a className="navbar-brand" href="/"><i className="fa-solid fa-layer-group"></i> <span>Compile-it!</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          {!isLoggedIn ?
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/login"><button type="button" className="btn btn-outline-primary me-3">Log In</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/signup"><button type="button" className="btn btn-primary">Sign Up</button></Link>
              </li>
            </ul>
            :
            <ul className="navbar-nav d-flex align-items-center">
              <li className='nav-item me-5'>
                <Link to='/dashboard' className='text-secondary'><i className="fa-solid fa-table-columns"></i></Link>
              </li>
              {/* <li className="nav-item me-5">
                <div className='search-wrapper text-secondary'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type='search' placeholder='Search here' />
                </div>
              </li> */}
              <li className="nav-item">
                <div className="dropdown text-secondary">
                  <div className='user-wrapper d-flex align-items-center dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-regular fa-circle-user"></i>
                    <div>
                      <h5 className='mb-0'>{decodedToken.name}</h5>
                      <h6>Member</h6>
                    </div>
                  </div>
                  <div className="dropdown-menu bg-light">
                    <button className="btn btn-outline-secondary ms-4" onClick={LogOut}> Log Out</button>
                  </div>
                </div>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navigation;