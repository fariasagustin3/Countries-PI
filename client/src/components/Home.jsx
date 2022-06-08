import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, filterByContinent, filterByActivity, orderByName, getActivities, orderByPopulation } from '../actions';
import { Link } from 'react-router-dom';
import Country from './Country';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './styles/Home.css';

function Home() {

  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage === 1 ? 9 : currentPage * countriesPerPage // 10
  const firstCountryIndex = currentPage === 1 ? 0 : lastCountryIndex - countriesPerPage // 0
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

  function handleSort(e) {
    dispatch(orderByName(e.target.value))
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  return(
    <div className='home-container'>
        <Link to='/activities'><button className='create-activity-btn'>Create Activity</button></Link>
        <h1 className='welcome-h1'>Welcome to Countries App</h1>
        <button className='reload-countries-btn' onClick={(e) => handleClick(e)}> Reload countries </button>
        <div>
        <div className='container-filters'>
        <SearchBar setCurrentPage={setCurrentPage} />
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
          </div>
          <Pagination 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            pagination={pagination}
          />
          <div className='all-countries-container'>
          {currentCountries.length === 0 
          ? "Countries not found"
          : currentCountries.map((c) => (
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