import React from 'react';


const Rank = ({name, posts}) =>{
	return(
			<div className="white f3">
				{
					`${name}, your post count is`
				}
							<div className="white f1">
				{
					`${posts}`
				}
			</div>

			</div>

		)
}

export default Rank;