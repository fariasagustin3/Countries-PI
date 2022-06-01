import React from 'react';
import { Link } from 'react-router-dom';


function Country({ id, name, flag, continent }) {
  return(
    <div className='container'>
      <Link to={`/countryDetail/${id}`} >
        <div className='country-container'>
          <div className='container-flag'>
            <img src={`${flag}`} alt='image not found' className='flag' width='300px' height='180px' />
          </div>
          <span className='name'>{name}</span>
          <span className='continent'>{continent}</span>
        </div>
      </Link>
    </div>
  )
}


export default Country;