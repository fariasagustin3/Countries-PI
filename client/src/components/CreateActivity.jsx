import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, getAllCountries, postActivity } from '../actions';
import { Link } from 'react-router-dom';
import './styles/CreateActivity.css';

function CreateActivity() {

  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries);
  const allActivities = useSelector(state => state.activities);
  const [error, setError] = useState({});
  const [activity, setActivity] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  })

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [])

  function handleInputChange(e) {
    e.preventDefault();
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    })
    setError(validate({ ...activity, [e.target.name]: e.target.value }));
  }

  function handleSelect(e) {
    e.preventDefault();
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    })
    setError(validate({ ...activity, [e.target.name]: e.target.value }));
  }

  function handleSelectCountries(e) {
    e.preventDefault();
    const name = e.target.value;
    if(Object.values(activity.countries).includes(e.target.value)) {
      alert(`The country ${name} already exists`);
    } else {
      setActivity({
        ...activity,
        countries: [
          ...activity.countries,
          e.target.value
        ]
      });
      setError(validate({
        ...activity,
        countries: [
          ...activity.countries,
          e.target.value
        ]
      }))
      console.log(activity)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(activity));
    const errors = validate(activity);
    if(Object.values(errors).length === 0) {
      console.log(activity);
      dispatch(postActivity(activity));
      alert("Activity created successfully!")
      setActivity({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
      })
    }
  }

  function removeCountry(e) {
    e.preventDefault();
    setActivity({
      ...activity,
      countries: activity.countries.filter(
        (c) => c !== e.target.name
      )
    })
    setError(validate({
      ...activity,
      countries: activity.countries.filter(
        (c) => c !== e.target.name
      )
    }))
    console.log(activity)
  }

  function validate(activity) {
    let errors = {}
    if(!activity.name) {
      errors.name = "Name is required";
    } else if(!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(activity.name)) {
      errors.name = "Name is invalid. Only letters are allowed";
    } else if(allActivities.findIndex(
      (e) => 
        e.name.toLowerCase() === activity.name.toLowerCase()
    ) !== -1 ) {
      errors.name = "The activity already exists";
    }
    if(!activity.duration || activity.duration === 'Duration') {
      errors.duration = 'Duration is required';
    }
    if(!activity.difficulty || activity.difficulty === 'Difficulty') {
      errors.difficulty = 'Difficulty is required';
    }
    if(!activity.season || activity.season === 'Season') {
      errors.season = 'Season is required';
    }
    if(!activity.countries[0]) {
      errors.countries = 'Country is required';
    }
    return errors;
  }

  return(
    <div className='form-container'>
      <Link to='/home'><button className='home-btn-form'>Home</button></Link>
      <form onSubmit={(e) => handleSubmit(e)} className='form'>
        <h2 className='form-title'>Let's create a new activity!</h2>
        <input className={!error.name ? 'input-name-form' : 'error-input-form'} type='text' name='name' value={activity.name} placeholder='Activity name...' onChange={(e) => handleInputChange(e)}></input>
        {error.name && (<p className='error'>{error.name}</p>)}

        <select className={!error.difficulty ? 'input-select-form' : 'error-select-form'} name='difficulty' onChange={(e) => handleSelect(e)}>
          <option selected disabled>Difficulty</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        {error.difficulty && (<p className='error'>{error.difficulty}</p>)}

        <select className={!error.duration ? 'input-select-form' : 'error-select-form'} name='duration' onChange={(e) => handleSelect(e)}>
          <option selected disabed>Duration</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        {error.duration && (<p className='error'>{error.duration}</p>)}

        <select className={!error.season ? 'input-select-form' : 'error-select-form'} name='season' onChange={(e) => handleSelect(e)}>
          <option selected disabled>Season</option>
          <option value='Autumn'>Autumn</option>
          <option value='Winter'>Winter</option>
          <option value='Spring'>Spring</option>
          <option value='Summer'>Summer</option>
        </select>
        {error.season && (<p className='error'>{error.season}</p>)}

        <select className={!error.countries ? 'input-select-form' : 'error-select-form'} onChange={(e) => handleSelectCountries(e)}>
          <option selected disabled>Countries</option>
          {allCountries?.map((c) => {
            return(
              <option key={c.id} name={c.name} value={c.name}>{c.name}</option>
            )
          })}
        </select>
        {activity.countries.length > 0 && (
          <div className='container-countries'>
            <p className='selected-countries-h1'>Selected Countries</p>
            <ul className='countries-list'>
              {activity.countries.map((c) => {
                let name = allCountries.map((country) =>
                  country.name === c ? country.name : null
                );
                return(
                  <div className='container-items'>
                    <li className='list-items' key={c.id}><button name={c} className='close-btn' onClick={(e) => removeCountry(e)}>X</button>{" "} {name}</li>
                  </div>
                )
              })}
            </ul>
          </div>
        )}
        {error.countries && (<p className='error'>{error.countries}</p>)}
        <button className='submit-form-btn' type='submit'><span>Submit</span></button>
        
      </form> 
    </div>
  );
}

export default CreateActivity;