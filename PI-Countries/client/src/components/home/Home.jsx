import React from 'react';
// import { Link } from 'react-router-dom';
import CardsCountries from '../cardsCountries/cardsCountries';
import Search from '../search/Search';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../../Store/actions';

function Home() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);


	useSelector( state => state.countries );
	
	return (
		<div>
			<br/>
			<Search/>
			<CardsCountries />
		</div>
	);
}

export default Home;