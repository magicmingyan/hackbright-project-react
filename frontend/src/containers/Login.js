import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import App from '../App'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		// $.post('http://localhost:5000/result', {email: this.state.email}, ()=>console.log("success!"))
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.post('http://localhost:5000/login', {email: this.state.email, password: this.state.password})
		.then(response => {
 			if(response.data.hasOwnProperty('token')){
				 window.localStorage.setItem('token', response.data.token);
				 this.props.history.push("/globe");
			 }
 			else if(response.data == "password incorrect"){
				 alert("username password do not match")
			 }
 			else{
				 alert("Username does not exist");
 			}
 		})
		 .catch(function (error) {
		 console.log(error);
 		});
 	}

	render() {
		return (
	      <div className="Login">
	        <form onSubmit={this.handleSubmit}>
	          <FormGroup controlId="email" bsSize="large">
	            <ControlLabel>Email</ControlLabel>
	            <FormControl
	              autoFocus
	              type="email"
	              value={this.state.email}
	              onChange={this.handleChange}
	            />
	          </FormGroup>

	          <FormGroup controlId="password" bsSize="large">
	            <ControlLabel>Password</ControlLabel>
	            <FormControl
	              type="password"
	              value={this.state.password}
	              onChange={this.handleChange}
	            />
	          </FormGroup>

	          <Button
	            block
	            bsSize="large"
	            disabled={!this.validateForm()}
	            type="submit"
	          >
	            Login
	          </Button>
	        </form>

	        <p>Dont have an account? </p>
	        <form onSubmit={this.handleRegister}>
	          <Button
	            block
	            bsSize="large"
	            type="submit"
	            href="/signup"
	          >
	            Signup
	          </Button>
	        </form>
	      </div>
					
		);
	}
}

export default Login;
