import React from 'react';
import { Link } from 'react-router-dom'
import './styles/LandingPage.css';


function LandingPage() {
  return(
    <div className="landing">
      <img className='background' src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWFydGglMjBpbiUyMHNwYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80' />
      <h1 className='landing-h1'>Welcome to Countries App</h1>
      <Link to='/home' className='nav-link'><button className='start-btn'>Start</button></Link>
    </div>
  )
}


export default LandingPage;