import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, filterByContinent, filterByActivity, orderByName, getActivities } from '../actions';
import { Link } from 'react-router-dom';
import Country from './Country';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function Home() {

  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage // 10
  const firstCountryIndex = lastCountryIndex - countriesPerPage // 0
  const currentCountries = allCountries.slice(firstCountryIndex, lastCountryIndex);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllCountries())
    dispatch(getActivities())
  }, [dispatch])

  function handleClick(e) {
    dispatch(getAllCountries());
  }

  function handleFilterContinent(e) {
    dispatch(filterByContinent(e.target.value))
  }

  function handleFilterActivity(e) {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value))
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  return(
    <div>
      <Link to='/activities'>Crear Actividad</Link>
      <h1>Welcome to Countries App</h1>
      <SearchBar />
      <button onClick={(e) => handleClick(e)}> Reload countries </button>
      <div>
        <select 
        className='order'
        onChange={(e) => handleSort(e)}
        >
          <option value='asc'> Ascending </option>
          <option value='des'> Descending  </option>
          <option value='low'> Lowest Population </option>
          <option value='high'> Highest Population </option>
        </select>
        <select 
          className='filter-by-continent'
          onChange={(e) => handleFilterContinent(e)}
          >
          <option value='All'> All </option>
          <option value='South America'> South America </option>
          <option value='North America'> North America </option>
          <option value='Africa'> Africa </option>
          <option value='Oceania'> Oceania </option>
          <option value='Asia'> Asia </option>
          <option value='Europe'> Europe </option>
        </select>
        <select 
          className='filter-by-activity'
          onChange={(e) => handleFilterActivity(e)}  
        >
          <option value='All'> All Activities </option>
          {activities.length && activities.map((e) => {
            return(
              <option value={e.id}>
              {e.name}
              </option>
            )
          })}
        </select>

        <Pagination 
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
        />

        <div className='containersss'>
        {currentCountries &&
          currentCountries.map((c) => (
            <Country
              key={c.id}
              id={c.id}
              name={c.name}
              flag={c.flag}
              continent={c.continent}
            />
          ))}
      </div>
      </div>
    </div>
  )

}


export default Home;