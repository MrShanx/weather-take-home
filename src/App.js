import React, {Component} from 'react'
// import styled from 'styled-components'
import CityNavigation from './component/CityNavigation/CityNavigation.js';
import CityWeather from './component/CityWeather/CityWeather.js';
import './App.css';
import Toronto from './images/Toronto.png';
import Montreal from './images/Montreal.png';
import Ottawa from './images/Ottawa.png';
// const Root = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// `

const API_KEY = 'fe3bbd1fe0a64c6446aebb0ca19143c1';

const initialState = 
	{
		city: '',
		description: '', //main weather description
		clouds: '',
		rain: '',
		sunset: '',
		current: '',
		max: '',
		min: '',
		image: '',
		buttonClicked: false
	}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	getBackground = (cityName) => {
		let background = '';
		if(cityName === 'Toronto') {
			background = Toronto;
		} else if(cityName === 'Montreal') {
			background = Montreal;
		} else {
			background = Ottawa;
		}
		return background;
	}

	onCityClick = (event) => {
		this.setState(initialState);
		this.setState({buttonClicked: true});
		//API call
		//set states for city clicked
		//samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
		let cityName = event.target.value;
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},ca&appid=${API_KEY}&units=metric`)
		.then(response => response.json())
		.then(city => {
			this.setState(
				{
					city: city.name,
					description: city.weather[0].description,
					clouds: city.clouds.all,
					rain: city.rain,
					sunset: city.sys.sunset,
					current: city.main.temp,
					max: city.main.temp_max,
					min: city.main.temp_min,
					image: this.getBackground(cityName),
				}
			);
		});
	}

	render() {
		const { city, description, clouds, rain, sunset, current, max, min, image, buttonClicked } = this.state;
		
		let day = new Date().getTime();
		let dayString = day.toString().substr(0, 10);
		let dayNum = parseInt(dayString, 10) + 85000;

		let timeOfTheDay ="NONE";
		if(dayNum <= sunset && sunset !== '') {
			timeOfTheDay = 'sun-background';
		} else if(dayNum > sunset && sunset !== '') {
			timeOfTheDay = 'moon-background';
		} else {
			timeOfTheDay = 'default-background';
		}

		return (
				<div className={`app ${timeOfTheDay}`} id="light">
					<div className="" id="clouds">
					<div className="" id="rain">
						<div className="app-content">
					    	<h1>REACT WEATHER</h1>
					    	<CityNavigation onCityClick={this.onCityClick} />
					    	{
					    		!buttonClicked
					    		? (
					    			<div></div>
					    		) : !city
					    		? (
					    			<h1>Loading...</h1>
					    		) : (
					    				<div className="weather-content">
							    			<CityWeather 
								    		city={city}
								    		description={description}
								    		clouds={clouds}
								    		rain={rain}
								    		sunset={sunset}
								    		current={current}
								    		max={max}
								    		min={min}
								    		image={image} />
								    	</div>
						    	)	
					    	}	
					    </div>
					</div>
					</div>
		    	</div>
		);
	}
}

export default App
