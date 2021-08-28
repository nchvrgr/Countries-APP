import React from 'react';
import style from './Card.module.css';

function Card({ name, flag, continent }) {
	return (
		<div className={style.body}>
			<p className={style.name}>{name}</p>
			<br/>
			<img className={style.flag} src={flag} alt={`bandera de ${name}`} />
			<br />
			<p>{continent}</p>
		</div>
	);
}

export default Card;
