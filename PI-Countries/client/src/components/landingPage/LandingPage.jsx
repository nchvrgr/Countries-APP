import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage() {
	useEffect( () => {
		document.title = `Landing - CountriesApp`;
	})
	return (
		<div className={style.landing}>
			<div id={style.title}>
				<h1 className={style.h1}>CountriesApp</h1>
			</div>
			<div className={style.botonDiv}>
				<Link to='/home' className={style.boton}>START</Link>
			</div>
			<div>
					
			</div>
		</div>
	);
}