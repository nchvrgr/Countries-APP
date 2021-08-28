import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesNames, getCountries } from '../../Store/actions';
import style from './Search.module.css';


export default function Search() {
	
	const [busqueda, setBusqueda] = useState('');
	
	function buscar(busqueda) {
		getCountriesNames(busqueda);
	}

	const handleChange = (d) => {
		setBusqueda(d);
	};

	function handleSubmit(e) {
		e.preventDefault();
		buscar(busqueda);
	}

	const dispatch = useDispatch();

	useEffect(() => {
		if(busqueda){
			dispatch(getCountriesNames(busqueda));
		}else{
			dispatch(getCountries());
		}
	}, [busqueda, dispatch]);

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className={style.divSearch}>
					<input
						className={style.searchBar}
						type='text'
						placeholder='Search Country'
						onChange={(e) => handleChange(e.target.value)}
					/>
					<button type='submit' className={style.button}>Search</button>
				</div>
			</form>
		</div>
	);
}