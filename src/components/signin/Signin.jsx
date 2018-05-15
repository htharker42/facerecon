import React, { Component } from 'react';

class SignIn extends Component {

	constructor(props){
		super();

		this.state={
			signInEmail: '',
			signInPassword: ''
		}
		//this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
	}

	onEmailChange=(e)=>{
		this.setState({signInEmail: e.target.value})
	}

	onPasswordChange=(e)=>{
		this.setState({signInPassword: e.target.value})
	}

	onSubmitSignIn=()=>{
		const {onRouteChange, loadUser} = this.props;
		
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email: this.state.signInEmail, 
									password: this.state.signInPassword})
		})
			.then(response => response.json())
			.then(user =>{
				if(user.id){
					loadUser(user)
					onRouteChange('home')
				}
			})

		console.log(this.state);

		
	}

	render(){
		const { onRouteChange } = this.props; 
	
		return(
			<div className="center">
	  			<article className="br3 shadow-5 hide-child relative ba b--black-20 mw6 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="email" 
					        		name="email-address"  
					        		id="email-address"
					        		onChange={this.onEmailChange} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="password" 
					        		name="password"  
					        		id="password"
					        		onChange={this.onPasswordChange}/>
					      </div>
					    </fieldset>
					    <div className="">
					      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
							      type="submit" 
							      value="Sign in" id="home" 
							      onClick={this.onSubmitSignIn} />
					    </div>
					    <div className="lh-copy mt3">
					      <a onClick={() => onRouteChange('register')} 
					      		href="#0" 
					      		className="f6 link dim black db pointer">Register</a>
					      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
					    </div>
					  </div>
					</main>
				</article>
			</div>
				)}
}

export default SignIn;