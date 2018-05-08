import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import logo from './logo.svg';



const Logo = () =>{
	return(
			<div className="ma">
				<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 250, width: 250 }} >
 					<div className="Tilt-inner">
 					 <img src={logo} alt="facescan logo" /> 
 					</div>
					</Tilt>

			</div>

		)
}

export default Logo;