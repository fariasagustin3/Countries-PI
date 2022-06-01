import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { countryByName } from '../actions/index';

function SearchBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	
	const handleInputChange = (e) => {
		// e.preventDefault();
		setName(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(countryByName(name))
	}

	return(
		<div>
			<label>Country: </label>
			<input type='text' placeholder='e.g. Argentina...' onChange={(e) => handleInputChange(e)} />
			<button type='submit' onClick={(e) => handleSubmit(e)}> Search </button>
		</div>
	)

}


export default SearchBar;