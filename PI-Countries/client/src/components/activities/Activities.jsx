import React from 'react'
import { Link } from 'react-router-dom';
import style from './Activities.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getActivities, getCountries, postActivity, getIds } from '../../Store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Activities() {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getCountries()
        );
        dispatch(getActivities())

		document.title= "Activities - CountriesApp";
	}, [dispatch]);
    var countries = useSelector( state => state.countries );
    var activities = useSelector( state => state.activities );
    const [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: 0,
        season: '',
        countries: []
    });

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
		dispatch(postActivity(activity));
        setActivity({
            ...activity,
            name: '',
            difficulty: '',
            time: 0,
            season: ''
        });
        document.getElementById('form').reset();
	}
    console.log("activities:", activities);
    // onChange={e => console.log(e.target.options[e.target.selectedIndex].value)
    return (
        <div>
            <div>
                <h2>Create a turistical activity</h2>
                <form id="form" onSubmit={handleSubmit} autoComplete="off">
                    <span>Name:</span>
                    <input type="text" name="name" onChange={handleChange} value={activity.name} required></input>
                    <br/>
                    <span>Season:</span>
                    <select name="season" onChange={handleChange} value={activity.season} required>
                        <option value="summer">Summer</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                    </select>
                    <br/>
                    <span>Difficulty: </span>
                    <select name="difficulty" onChange={handleChange} value={activity.difficulty} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/>
                    <span>Duration:</span>
                    <input type="number" name="duration" value={activity.duration} onChange={handleChange} required></input>
                    <br/>
                    <select multiple name="countries" onChange={handleIds} value={activity.countries} required>
                        {countries?countries.length>0?countries.map(country => {
                            return(
                                <option key={country.id} value={country.id}>{country.name}</option>
                            )
                        }):<option>There's no countries to show</option>:<option>No country</option>}
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <br/>
            <h1>Activities:</h1>
            <div>
                {activities?activities.length>0?activities.map( activity => {
                    return(<div key={activity.id} className={style.activity}> 
                        <h1>{activity.name}</h1>
                        <p>Difficulty: {    activity.difficulty}</p>
                        <p>Duration: {activity.duration}</p>
                        <p>Season: {activity.season}</p>
                    </div>)
                }
                ):<h2>There's no activities to show yet</h2>:<h2>No actiasdadsvities found</h2>}
            </div>
            <Link to="/home">
                <p>Volver</p>
            </Link>
        </div>
    )
}

export default Activities
