import React from 'react'
import { Link } from 'react-router-dom';
import style from './NavBar.module.css'
import img from './globe.png'

function NavBar() {
    return (
        <div className={style.nav}>
            <Link to = "/" className={style.link}>
                <div className={style.logoDiv}>
                    <img className={style.logo} src={img}/>
                    <h2 className={style.title}>Countries App</h2>
                </div>
            </Link> 
            <div className={style.options}>
                <Link to = "/home" className={style.link}>
                    <p className={style.option}>Countries</p>
                </Link>
                <Link to = "/activities" className={style.link}>
                    <p className={style.option}>Activities</p>
                </Link>
                <Link to = "/" className={style.link}>
                    <p className={style.option}>Landing Page</p>
                </Link>
                <Link to = "/about" className={style.link}>
                    <p className={style.option}>About</p>
                </Link>
            </div>

        </div>
    )
}

export default NavBar
