import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_NAME = 'GET_COUNTRIES_NAME';
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_CONTINENT = "GET_CONTINENT";
export const SET_CONTINENT = 'SET_CONTINENT';

export function getCountries() {
	return function (dispatch) {
		return axios.get(`http://localhost:3001/countries`)
        .then((countries) => {
			dispatch({
				type: GET_COUNTRIES,
				payload: countries.data,
			});
		});
	};
}

export function setContinent(element){
	return function (dispatch) {
		return dispatch({
			type: SET_CONTINENT,
			payload: element
		})
	}
}

export function getContinent(){
	return function (dispatch) {
		return dispatch({
			type: GET_CONTINENT
		})
	}
}

export function getIds(arr){
	let aux = [];
	for (let i = 0; i < arr.length; i++) {
		arr[i].selected&&aux.push(arr[i].value);
	}
	return aux;
}

export function postActivity (activity) {
	console.log("actions activity:", activity);
    return async function () {
         await axios.post(`http://localhost:3001/activity`, activity);
    };  
}
export function getActivities(){
	return function(dispatch){
		return axios.get('http://localhost:3001/activity')
		.then( activities => {
			dispatch({
				type: GET_ACTIVITIES,
				payload: activities.data
			})
		})
	}
}

export function getCountriesNames(name) {
	return function (dispatch) {
		return axios.get(`http://localhost:3001/countries/?name=${name}`)
        .then((countries) => {
			dispatch({
				type: GET_COUNTRIES_NAME,
				payload: countries.data,
			});
		});
	};
}

export function getCountryById(id){
	return function(dispatch){
		return axios.get(`http://localhost:3001/countries/${id}`)
		.then( country => {
			dispatch({
				type: GET_COUNTRY_ID,
				payload: country.data
			})
		})
	}
}

