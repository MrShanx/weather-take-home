import React from 'react';
import './CityWeather.css';

const CityWeather = ({ city, description, clouds, rain, sunset, current, max, min, image }) => {
	let day = new Date().getTime();
	let dayNum = parseInt(day, 10) * 0.001; //milliseconds to seconds coversion

	let star;
	if(dayNum < sunset) {
		// timeOfTheDay = 'sun-background';
		star = 'sun';
	} else {
		// timeOfTheDay = 'moon-background';
		star = 'moon'
	}

	let date = new Date(sunset*1000);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();
	let seconds = "0" + date.getSeconds();

	//MM:HH:SS format
	let formattedSunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return (
		<div className="weather-container-out">
			<div className="weather-container">
				<h2>Today's weather in <span className="emphasize">{city}</span></h2>
				<div className="information"> 
					<h3>Description: {description}</h3>
					<p>{"Sunset: " + formattedSunset}</p>
					<p>temperature: <span className="emphasize">{current}</span> C</p>
					<p>max: {max} C</p>
					<p>min: {min} C</p>
				</div>
				<div className="weather">
					<div className={"s"} id="day-background">					
						<div className={star} id="day-star"></div>
						<img className="weather-img" src={image} alt="skyline"/>	
					</div>
				</div>
			</div>
		</div>
	)
}

export default CityWeather;