import { GET_COUNTRIES, SET_CONTINENT, GET_COUNTRIES_NAME, GET_COUNTRY_ID, GET_ACTIVITIES, GET_CONTINENT } from './actions';

const initialState = {
	countries: [],
	countryDetail: {},
	activities: [],
	continent: ""
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COUNTRIES:
			return {
				...state,
				countries: action.payload 
			};
		case GET_COUNTRIES_NAME:
			return {
				...state,
				countries: action.payload
			};
		case GET_COUNTRY_ID:
			return{
				...state,
				countryDetail: action.payload 
			};
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload 
			}
		case GET_CONTINENT:
			return {
				...state
			}
		case SET_CONTINENT:
			return {
				...state,
				countries: state.countries.filter( country =>  country.continent === action.payload )
			}
		default:
			return { ...state };
	}
};
export default reducer;