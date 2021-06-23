import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, getCountryById } from '../../Store/actions';
import { Link } from 'react-router-dom';
import style from './CountryDetail.module.css'

function CountryDetail(props) {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getCountryById(id));
        dispatch(getActivities());
	}, []);
    var id = props.match.params.id;
    var country = useSelector(state => state.countryDetail);


    return (
        <>
            <div>
                {country?<div className={style.country}>
                    <div>
                        <h1>{country.name}</h1>
                        <h4>Continent: {country.continent}</h4>
                        <h4>Capital: {country.capital}</h4>
                        <h4>Area: {country.area}</h4>
                        <h4>Population: {country.population}</h4>
                        <h4>Subregion: {country.subregion}</h4>
                    </div>
                    <div>
                        <img src={country.image} className={style.image}/>
                    </div>
                </div>:<p>THIS COUNTRY IS NOT AVAILABLE</p>}
            </div>
            <div>
                <h1>Activities:</h1>
            </div>
            <div>
            {
                country?country.Activities?country.Activities.length>0?country.Activities.map(
                    activity => {
                        return(
                            <div className={style.activity} key={activity.id}>
                                <h1>{activity.name}</h1>
                                <p>{activity.duration}</p>
                                <p>{activity.difficulty}</p>
                                <p>{activity.season}</p>
                            </div>
                        )
                    }
                )
                :<p>There's no activities</p>:<p>No activities</p>:<p>No country</p>
            }
            </div>

        </>

    )
}

export default CountryDetail;