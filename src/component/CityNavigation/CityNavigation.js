import React from 'react';
import './CityNavigation.css';

const CityNavigation = ({ onCityClick }) => {
	return (
		<div className="button-container">
			<button 
				className="glass"
				onClick={onCityClick} 
				value="Toronto">Toronto</button>
			<button 
				className="glass"
				onClick={onCityClick} 
				value="Montreal">Montreal</button>
			<button 
				className="glass"
				onClick={onCityClick} 
				value="Ottawa">Ottawa</button>
		</div>
	)
}

export default CityNavigation;