import React from 'react';
import './styles/Pagination.css';

function Pagination({ countriesPerPage, allCountries, pagination }) {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return(
    <nav>
      <ul className='pagination'>
        { pageNumbers?.map((number) => {
          return(
          <button className='pagination-btn' onClick={() => pagination(number)}>{number}</button>
        )})}
      </ul>
    </nav>    
  )
}


export default Pagination;