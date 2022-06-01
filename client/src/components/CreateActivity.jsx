import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getAllCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries)
  const history = useHistory();

  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  })

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  function handleChangeSelect(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  function handleSelectCountries(e) {
    const name = e.target.value;
    if(Object.values(input.countries).includes(e.target.value)) alert(`The country ${name} already exists`)
    else {
      setInput({ ...input, countries: [...input.countries, e.target.value] })
    }
  }

  function handleInputChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postActivity(input))
    alert("Activity created successfully!")
    setInput({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: []
    })
  }

  function removeCountry(e) {
    e.preventDefault();
    setInput({ ...input, countries: input.countries.filter((c) => c !== e.target.name) })

  }


  return(
    <div>
      <Link to='/home'><button>Home</button></Link>
      <h1>Let's create an activity</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name: </label>
        <input type='text' name='name' value={input.name} placeholder='e.g Football' onChange={(e) => handleInputChange(e)} />
        <label>Difficulty: </label>
        <select name='difficulty' onChange={(e) => handleChangeSelect(e)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <label>Duration: </label>
        <select name='duration' onChange={(e) => handleChangeSelect(e)}>
          <option value='1'>1 hour</option>
          <option value='2'>2 hours</option>
          <option value='3'>3 hours</option>
          <option value='4'>4 hours</option>
          <option value='5'>5 hours</option>
        </select>
        <select name='season' onChange={(e) => handleChangeSelect(e)}>
          <option>Autumn</option>
          <option>Winter</option>
          <option>Spring</option>
          <option>Summer</option>
        </select>
        <select onChange={(e) => handleSelectCountries(e)}>
          <option selected disabled> --Select Countries-- </option>
          {countries?.map((c) => {
            return(
              <option key={c.id} name={c.name} value={c.name}>{c.name}</option> 
            )
          })}
        </select>
        {input.countries.length > 0 && (
          <div>
            <p>Selected Countries</p>
            <ul>
              {input.countries.map((c) => {
                const name = countries.map((country) =>
                  country.name === c ? country.name : null
                );
                return (
                  <div>
                    <li><button name={c} onClick={(e) => removeCountry(e)}>❌</button>{" "} {name} </li>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
        <button type='submit'><span>Submit</span></button>
      </form>
    </div>
  )
}

export default CreateActivity;