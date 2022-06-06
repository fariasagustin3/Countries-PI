import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { countryByName } from '../actions/index';
import './styles/SearchBar.css';

function SearchBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	
	const handleInputChange = (e) => {
		// e.preventDefault();
		setName(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(countryByName(name))
		setCurrentPage(1);
		setName('')
	}

	return(
		<div className='search-bar-container'>
			<input className='search-bar-input' type='text' placeholder='e.g. Argentina...' onChange={(e) => handleInputChange(e)} />
			<button className='search-bar-submit' type='submit' onClick={(e) => handleSubmit(e)}> Search </button>
		</div>
	)

}


export default SearchBar;