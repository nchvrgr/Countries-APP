import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, getCountries } from '../../Store/actions';
import Card from '../card/Card';
import style from './cardsCountries.module.css';
import { Link } from 'react-router-dom';
import { alphaAsc, alphaDesc, populationAsc, populationDesc, filterAmericas, filterAfrica, filterAsia, filterEurope, filterOceania, filterPolar, filterUndefined } from '../filters/filters'

function CardsCountries() {

	const [page, setPage] = useState(0);
	const [order, setOrder] = useState("alphAsc");
	const [continent, setContinent] = useState();
	const dispatch = useDispatch();
	var countries = useSelector( state => state.countries );
	var activities = useSelector( state => state.activities);
	useEffect( () => {
		dispatch(getCountries());
		dispatch(getActivities());
		document.title= "Countries - CountriesApp";
	}, []	);
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
		default:
			break;
	}
	switch (continent) {
		case "Africa":
			countries = filterAfrica(countries);
			break;
		case "America":
			countries = filterAmericas(countries);
			break;
		case "Asia":
			countries = filterAsia(countries);
			break;
		case "Europe":
			countries = filterEurope(countries);
			break;
		case "Oceania":
			countries = filterOceania(countries);
			break;
		case "Polar":
			countries = filterPolar(countries);
			break;
		case "Undefined":
			countries = filterUndefined(countries);
			break;
		default:
			break;
	}
	function continentChange(event) {
		setContinent(event.target.selectedOptions[0].innerHTML);
		setPage(0);
	}
	console.log("activities:", activities);
	return (
		<>
			<div className={style.opciones}>
				Sort by:
				<form autoComplete="off">
					<div className={style.opciones2}>
						<div className={style.opcion}>
							<p>Name ▲</p>
							<input name="opcion" type="radio" value="alphAsc" checked={order === "alphAsc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<div className={style.opcion}>
							<p>Name ▼</p>
							<input name="opcion" type="radio" value="alphDesc" checked={order === "alphDesc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<div className={style.opcion}>
							<p>Population ▲</p>
							<input name="opcion" type="radio" value="popAsc" checked={order === "popAsc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
						<div className={style.opcion}>
							<p>Population ▼</p>
							<input name="opcion" type="radio" value="popDesc" checked={order === "popDesc"} onChange={e => setOrder(e.currentTarget.value)}></input>
						</div>
					</div>
				</form>
				<div className={style.selectDiv}>
					Sort by continent:
					<select name="select" onChange={ el => continentChange(el)} className={style.select}>
						<option value="all">All continents</option>
						<option value="africa">Africa</option>
						<option value="america">America</option>
						<option value="asia">Asia</option>
						<option value="europe">Europe</option>
						<option value="oceania">Oceania</option>
						<option value="Polar">Polar</option>
						<option value="undefined">Undefined</option>
					</select>
					Sort by activity:
					<select name="selectActivity" className={style.select}>
						<option>Any activities</option>
						{
							activities?activities.length>0?activities.map(
								activity => {
									return(
										<option key={activity.id}>
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
					countries.length>0?countries.slice(page*10, page*10+10).map( country => {
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
