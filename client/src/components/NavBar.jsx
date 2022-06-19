import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByActivity, filterByContinent, getAllCountries, orderByName, orderByPopulation } from '../actions';
import SearchBar from './SearchBar';
import './styles/NavBar.css';

function NavBar({ setCurrentPage, allCountries  }) {

  const activities = useSelector(state => state.activities)

  const [order, setOrder] = useState("");

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value))
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterActivity(e) {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  return(
    <div className='container-nav'>
      <Link to='/activities'><button className='create-activity-btn'>Create!</button></Link>
      <select 
        className='select'
        onChange={(e) => handleSort(e)}
        >
          <option selected disabled>--Sort--</option>
          <option value='asc'> Ascending </option>
          <option value='des'> Descending  </option>
          <option value='low'> Lowest Population </option>
          <option value='high'> Highest Population </option>
      </select>
      <select 
        className='select'
        onChange={(e) => handleFilterContinent(e)}
      >
          <option selected disabled>--Continents--</option>
          <option value='All'> All </option>
          <option value='South America'> South America </option>
          <option value='North America'> North America </option>
          <option value='Africa'> Africa </option>
          <option value='Oceania'> Oceania </option>
          <option value='Asia'> Asia </option>
          <option value='Europe'> Europe </option>
      </select>
      <select 
        className='select'
        onChange={(e) => handleFilterActivity(e)}  
      >
        <option selected disabled>--Activities--</option>
        <option value='all'> All Activities </option>
        {activities && activities.map((e) => {
          return(
            <option key={e.id} value={e.name}>{e.name}</option>
          )
        })}
      </select>
      <button className='reload-countries-btn' onClick={(e) => handleClick(e)}> ⟳ </button>
      <SearchBar setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default NavBar;