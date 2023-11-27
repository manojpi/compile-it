import React, { useState, useEffect, useCallback } from 'react'
import Navigation from '../components/Navigation'
import './Dashboard.css'
import UploadCard from '../components/UploadCard';
const {Uploader} = require("uploader");

function Dashboard() {
  const compile = () => {}
  return (
    <div className='bg-dark container-height'>
      <Navigation />
      <div className='container-fluid mt-5'>
        <div className='row align-items-center'>
          <div className='col-7 text-center'>
            <div className='dashboard'> </div>
            <h1 className='text-light'>Compile-it</h1>
          </div>

          <div className='col-4'>
            <UploadCard/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
