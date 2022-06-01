import React from 'react';
import { Link } from 'react-router-dom'


function LandingPage() {
  return(
    <div className="landing">
      <h1>Landing de Countries</h1>
      <Link to='/home'>
      <button>Start</button>
      </Link>
    </div>
  )
}


export default LandingPage;