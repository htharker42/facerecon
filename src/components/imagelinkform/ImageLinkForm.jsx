import React from 'react';
import './imagelinkform.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{

		return(
				<div> 
				<p className="f3"> {'Submit an Image Url'} </p>
						<div className=" center form centerform pa4 br3 shadow-5">
							<input className="f4 pa2 w-70 center" type='text' placeholder="submit Image URL" onChange={onInputChange} />
							<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}> Detect Faces </button> 
						</div>
				</div>

			)
}

export default ImageLinkForm; 