import { GET_COUNTRIES , GET_COUNTRIES_NAME, GET_COUNTRY_ID, GET_ACTIVITIES } from './actions';

const initialState = {
	countries: [],
	countryDetail: {},
	activities: [] 
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
		default:
			return { ...state };
	}
};
export default reducer;