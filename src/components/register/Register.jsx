import React, { Component } from 'react';



class Register extends Component {
	constructor(props){
		super(props)
		this.state={
			newPassword: '',
			newEmail: '',
			newName: '',
		
		}
	}

	onValueChange=(e)=>{
		console.log(e.target.id, e.target.value)
		this.setState({[e.target.id]: e.target.value})
	}

	onChangePassword=(e)=>{
		this.setState({newPassword: e.target.value})
	}

	onChangeEmail=(e)=>{
		this.setState({newEmail: e.target.value})
	}

	onSubmitForm=()=>{
		const url = 'http://localhost:3000/register';
		const {onRouteChange, loadUser} = this.props; 
		const {newEmail, newPassword, newName } = this.state;



		fetch(url, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({	
									email: newEmail,
									password: newPassword,
									name: newName
								})
		})
			.then(response => response.json())
			.then(user =>{
				if(user){
					loadUser(user);
					onRouteChange('home');
				}
			})

		}

	test=(e)=>{
		console.log('click')
	}

	render(){
		
		return(
			<div className="center">
	  			<article className="br3 shadow-5 hide-child relative ba b--black-20 mw6 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="email" 
					        		name="email-address"  	
					        		id="newEmail"
					        		onChange={this.onValueChange} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="password" 
					        		name="password"  
					        		id="newPassword"
					        		onChange={this.onValueChange}
					        		/>
					      </div>
					      <div className="mv3">
					      <label className="db fw6 lh-copy f6" htmlFor="password">Name</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="password" 
					        		name="password"  
					        		id="newName"
					        		onChange={this.onValueChange}
					        		/>
					      </div>
					    </fieldset>
					    <div className="">
					      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      			type="submit" 
					      			value="Register" 
					      			id="home" 
					      			onClick={this.onSubmitForm} />
					    </div>

					  </div>
					</main>
				</article>
			</div>
				)
	}}

export default Register;