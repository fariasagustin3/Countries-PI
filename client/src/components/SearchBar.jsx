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
		<div class="search-box">
    	<button onClick={(e) => handleSubmit(e)} className="btn-search"><i className="fas fa-search"></i>🔎</button>
    	<input onChange={(e) => handleInputChange(e)} type="text" className="input-search" placeholder="Type to Search..." />
  		</div>
	)

}


export default SearchBar;