import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, filterByContinent, filterByActivity, orderByName, getActivities, orderByPopulation } from '../actions';
import { Link } from 'react-router-dom';
import Country from './Country';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './styles/Home.css';
import NavBar from './NavBar';
import Loading from './Loading';

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




  return(
    <div className='home-container'>
      <NavBar 
        setCurrentPage={setCurrentPage}
        allCountries={allCountries}   
      />
        <h1 className='welcome-h1'>Welcome to Countries App</h1>
        <div>
          </div>
          <Pagination 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            pagination={pagination}
          />
          <div className='all-countries-container'>
          {currentCountries.length === 0 
          ? <Loading />
          :  currentCountries.map((c) => (
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
  )

}


export default Home;