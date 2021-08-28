import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getActivities, getCountries, getContinent, setContinent } from '../../Store/actions';
import Card from '../card/Card';
import style from './cardsCountries.module.css';
import { alphaAsc, alphaDesc, populationAsc, populationDesc} from '../filters/filters'

function CardsCountries() {
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState("alphAsc");
	const [activity, setActivity] = useState(0);
	const [select, setSelect] = useState(0);
	const dispatch = useDispatch();
	var countries = useSelector( state => state.countries);
	var activities = useSelector( state => state.activities);

	useEffect( () => {
		dispatch(getCountries());
		dispatch(getActivities());
		dispatch(getContinent());
		document.title= "Countries - CountriesApp";
	}, [dispatch]);

	var idKey = 0;
	function pageNext(){
		var max = Math.ceil(countries.length/10-1);
		if(max < 0) max = 1;
		if(page < max) setPage(page+1);
	}
	function pagePrev(){
		var min = 0;
		if (page > min) setPage(page - 1);
	}
	switch (order) {
		case "alphAsc":
			countries = alphaAsc(countries);
			break;
		case "alphDesc":
			countries = alphaDesc(countries);
			break;
		case "popAsc":
			countries = populationAsc(countries);
			break;
		case "popDesc":
			countries = populationDesc(countries);
			break
		default:
			return;
	}

	async function continentChange(event) {
		await dispatch(getCountries());
		var cont = await event.target.selectedOptions[0].value;
		if (cont === "all"){
			await dispatch(getCountries());
		}else{
			await dispatch(setContinent(cont));
		}
		await setPage(0);
	}

	function handleCheck(e){
		if (e.target.checked){
			setActivity(1);
		}else{
			setActivity(0);
		}
	}

	function handleActivity(e){
		setSelect(activities[e.target.options[e.target.selectedIndex].value].Countries);
	}

	return (
		<>
			<div className={style.opciones}>
				Sort by:
				<form autoComplete="off">
					<div className={style.opciones2}>
						<div className={style.opcion}>
							<p className={style.opcionName}>Name ▲</p>
							<input name="opcion" type="radio" value="alphAsc" checked={order === "alphAsc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<div className={style.opcion}>
							<p className={style.opcionName}>Name ▼</p>
							<input name="opcion" type="radio" value="alphDesc" checked={order === "alphDesc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<br/>
						<div className={style.opcion}>
							<p className={style.opcionName}>Population ▲</p>
							<input name="opcion" type="radio" value="popAsc" checked={order === "popAsc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<div className={style.opcion}>
							<p className={style.opcionName}>Population ▼</p>
							<input name="opcion" type="radio" value="popDesc" checked={order === "popDesc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
					</div>
				</form>
				<div className={style.selectDiv}>
					<span>Sort by continent:</span>
					<select name="select" onChange={ el => continentChange(el)} className={style.select}>
						<option value="all">All continents</option>
						<option value="Africa">Africa</option>
						<option value="Americas">Americas</option>
						<option value="Asia">Asia</option>
						<option value="Europe">Europe</option>
						<option value="Oceania">Oceania</option>
						<option value="Polar">Polar</option>
						<option value="Undefined">Undefined</option>
					</select>
					<input type="checkbox" onChange={e => handleCheck(e)}></input>
					<span>Sort by activity:</span>
					<select name="selectActivity" className={style.select} onChange={e => handleActivity(e)}>
						{
							activities?activities.length>0?activities.map(
								activity => {
									return(
										<option key={activity.id} value={activity.id-1}>
											{activity.name}
										</option>
									)
								}
							):<p>Not enough activities</p>:<p>No countries</p>
						}
					</select>
				</div>
				</div>
			<div className={style.cards}>

				{
					activity>0?<div>
						{select?select.map( country => {
						return(
							<Link to={`/countries/${country.id}`} key={++idKey}>
								<Card
									className={style.body}
									name={country.name}
									flag={country.image}
									continent={country.continent}
									></Card>
							</Link>
						)
					}):
					
					<p>No countries</p> }
				
					
					</div>:countries.length>0?countries.slice(page*10, page*10+10).map( country => {
						return(
							<Link to={`/countries/${country.id}`} key={++idKey}>
								<Card
									className={style.body}
									name={country.name}
									flag={country.image}
									continent={country.continent}
									></Card>
							</Link>
						    )
						}
					)
					:<p>No country found</p>
					
				}
				<div className={style.page}>
					<button onClick={pagePrev} className={style.pageButtons}>←</button>
					<p className={style.pageLabel}> {page+1} </p>
					<button onClick={pageNext} className={style.pageButtons}>→</button>
				</div>
			</div>
		</>
	);
	
}


export default CardsCountries;
