import React from 'react';

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
          <button onClick={() => pagination(number)}>{number}</button>
        )})}
      </ul>
    </nav>    
  )
}


export default Pagination;