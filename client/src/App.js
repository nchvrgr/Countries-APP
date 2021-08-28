import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CountryDetail from './components/countryDetail/CountryDetail';
//import CardsCountries from './components/cardsCountries/CardsCountries';
import NavBar from './components/navBar/NavBar';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage.jsx';
import About from './components/about/About';
import Activities from './components/activities/Activities'

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path="/" component={NavBar}/>
			</Switch>
			<Route path='/home' component={Home} />
			<Route exact path="/countries/:id" component={CountryDetail}/>
			<Route exact path="/about" component={About}/>
			<Route exact path='/activities' component={Activities}></Route>
		</React.Fragment> 
	);
}

export default App;

