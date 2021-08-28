import React from 'react'
import style from './About.module.css'
import { Link } from 'react-router-dom';

function About() {

    return (
        <div className={style.about}>
            <div className={style.text}>
                <h3> Hi there! My name is Juan Ignacio Vergara, this is my <a className={style.link} href="http://www.google.com">GitHub</a>, and this is my <a className={style.link} href="http://www.google.com">LinkedIn</a>. I made this app as an individual project for the Full Stack Web Developer intensive bootcamp <a className={style.link} href="http://www.soyhenry.com">Henry</a>. I made the front-end and back-end of this app by myself. For the back-end I used Node, Sequelize and PostgreSQL, and for the front-end I used React and Redux. The app works fetching data from the <a className={style.link} href="https://restcountries.eu/">REST Countries API</a>. The back-end is in charge of fetching the data from all the countries, and giving them a shape to be taken correctly from the front-end. The front-end is in charge of showing all the countries and filtering them, it can sort the countries by continent, alphabetically or by population. Also we can post touristic activities for the countries and save it, it works with a POST route in the back-end. I'm working on this web app to make it responsive and achieve a better UX and UI. Hope you like it.   </h3>
                <br/>
            </div>
            <div className={style.links}>
                <Link to="http://www.google.com" className={style.github}>
                    <img className={style.imageg}  alt="github" src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"/>
                    <a className={style.link2} href="http://www.google.com">Github</a>
                </Link>
                <Link to="http://www.google.com" className={style.linkedin}>
                    <img className={style.imagel} alt="linkedin" src="https://events.lazarillo.app/images/blog/linkedin-blanco.png"/>
                    <a className={style.link2} href="http://www.google.com"> LinkedIn</a>
                </Link>
            </div>
        </div>
    )
}

export default About
