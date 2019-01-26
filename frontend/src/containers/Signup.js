import React, { Component } from "react";
import axios from "axios";
import App from "../App";
import Form from "./Form";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_name: "",
			email: "",
			password: ""
		};
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
		axios
			.post("http://localhost:5000/signup", {
				user_name: this.state.user_name,
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				if (response.data.hasOwnProperty("token")) {
					window.localStorage.setItem("token", response.data.token);
					this.props.history.push("/globe");
				} else {
					alert("Signup not successful");
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return(
		  <Form 
		  	handleChange={this.handleChange}
		  	handleSubmit={this.handleSubmit}
		  	validateForm={this.validateForm}
		  	user_name={this.state.user_name}
		  	email={this.state.email}
		  	password={this.state.password}
		  	
		  />
		)
	}
}

export default Signup;