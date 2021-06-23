import React from 'react'
import { Link } from 'react-router-dom';
import style from './Activities.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getActivities, getCountries, postActivity, getIds } from '../../Store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Activities() {
    const [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: 0,
        season: '',
        countries: []
    });
    var countries = useSelector( state => state.countries );
    var activities = useSelector( state => state.activities );
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getCountries());
        dispatch(getActivities());
		document.title= "Activities - CountriesApp";
	}, [dispatch, activity]);

    const [refresh, setRefresh] = useState(0);

    function handleChange(e){
        e.preventDefault();
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
    }

    function handleIds (e) {
        e.preventDefault();
        let ids = e.target.options;
        setActivity({
            ...activity,
            countries: getIds(ids)
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
		dispatch(postActivity(activity));
        setActivity({
            ...activity,
            name: '',
            difficulty: '',
            duration: 0,
            season: '',
            countries: []
        });
	}
    // onChange={e => console.log(e.target.options[e.target.selectedIndex].value)
    return (
        <div className={style.body}>
            <div className={style.create}>
                <h2>Create a turistical activity</h2>
                <form id="form" onSubmit={handleSubmit}  autoComplete="off">
                    <div className={style.form}>
                        <span>Name:</span>
                        <input type="text" className={style.inputs} name="name" onChange={handleChange} value={activity.name} required></input>
                        <br/>
                        <span>Season:</span>
                        <select name="season" className={style.inputs} onChange={handleChange} value={activity.season} required>
                            <option value="summer">Summer</option>
                            <option value="autumn">Autumn</option>
                            <option value="winter">Winter</option>
                            <option value="spring">Spring</option>
                        </select>
                        <br/>
                        <span>Difficulty: </span>
                        <select name="difficulty" className={style.inputs} onChange={handleChange} value={activity.difficulty} required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <br/>
                        <span>Duration:</span>
                        <input type="number" className={style.inputs} name="duration" value={activity.duration} onChange={handleChange} required></input>
                        <br/>
                        <select multiple name="countries" className={style.selectCountries} onChange={handleIds} value={activity.countries} required>
                            {countries?countries.length>0?countries.map(country => {
                                return(
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                )
                            }):<option>There's no countries to show</option>:<option>No country</option>}
                        </select>  
                    </div>
                    <br/>
                    <button type="submit" className={style.button} >Submit</button>
                </form>
            </div>
            <br/>
            <h1>Activities:</h1>
            <div>
                {activities?activities.length>0?activities.map( activity => {
                    return(<div key={activity.id} className={style.activity}> 
                        <h1>{activity.name}</h1>
                        <div className={style.details}>
                            <p>Difficulty: {activity.difficulty}</p>
                            <p>Duration: {activity.duration} hours</p>
                            <p>Season: {activity.season}</p>
                            <hr/>
                            <b>Countries:</b>
                        </div>
                        <div className={style.activCountries}> 
                        {activity.Countries?activity.Countries.map( country => {
                            return(
                                <p className={style.country}>{country.name}</p>
                            )
                        }):<p>No country found</p>}
                        </div>
                       
                    </div>)
                }
                ):<h2>There's no activities to show yet</h2>:<h2>No actiasdadsvities found</h2>}
            </div>
            <Link to="/home" className={style.volver}>
                <p className={style.volver}>Volver</p>
            </Link>
        </div>
    )
}

export default Activities
