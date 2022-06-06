import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Country.css'


function Country({ id, name, flag, continent }) {
  return(
    <div className='container'>
      <Link to={`detail/${id}`}>
        <div className='country-container'>
          <div className='container-flag'>
            <img src={`${flag}`} alt='image not found' className='flag' width='300px' height='180px' />
          </div>
          <span className='country-name'>{name}</span>
          <span className='continent'>{continent}</span>
        </div>
      </Link>
    </div>
  )
}


export default Country;