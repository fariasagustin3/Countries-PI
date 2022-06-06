import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../actions/index';
import './styles/Detail.css'; 

function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    dispatch(getDetails(props.match.params.id))
  }, [dispatch])

  const country = useSelector(state => state.detail)


  return(
  <div>
    <Link to='/home'><button className='detail-home-btn'>Home</button></Link>
    <Link to='/activities'><button className='detail-create-activity-btn'>Create Activity</button></Link>
    {country.result ? (
      <div className='div-country-detail-container'>
        <div>
          <div>
            <img src={`${country.result && country.result.flag}`} alt="BANDERA" width='300' height='200' />
          </div>
          <div className='data-container'>
            <h1 className='name-h1'> {country.result.name} </h1>
            <label className='label'>({country.result.id})</label>
            <br />
            <label className='label'>Area: {country.result.area} KM² </label>
            <label className='label'>Capital: {country.result.capital}</label>
            <label className='label'>Continent: {country.result.continent}</label>
            <label className='label'>Population:{" "} {country.result.population === 0 ? country.result.population : country.result.population}</label>
            <label className='label'>Subregion: {country.result.subregion}</label>
          </div>
          <h3 className='activities-title'>Activities</h3>
          <hr className='hr' />
          {country.result.activities.length > 0 ? (
            country.result.activities.map((c) => (
              <div key={c.id} className='label-container'>
                <label className='label'>Name: {c.name}</label>
                {/* <label className='label'>ID: {c.id}</label> */}
                <label className='label'>Season: {c.season}</label>
                <label className='label'>Duration: {c.duration}</label>
                <label className='label'>Difficulty: {c.difficulty}</label>
                <hr className='hr' />
              </div>
            ))
          ) : (
            <label className='country-error'>
              This country doesn't have any activity.
            </label>
          )}
        </div>
      </div>
    ) : (
      ""
    )}
  </div>
  )
}


export default Detail;