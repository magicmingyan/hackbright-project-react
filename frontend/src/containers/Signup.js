import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import App from '../App'

class Signup extends Component {
	constructor(props){
		super(props);
		this.state={
			user_name:'',
			email:'',
			password:''
		}
	}

	validateForm() {
	    return (
	      this.state.email.length > 0 &&
	      this.state.password.length > 0 &&
	      this.state.password === this.state.confirmPassword
	    );
	}

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }


	render() {
	    return (
	      <div className="Signup">
	        <form onSubmit={this.handleSubmit}>

	          <FormGroup controlId="user_name" bsSize="large">
	            <ControlLabel>User Name</ControlLabel>
	            <FormControl
	              autoFocus
	              type="user_name"
	              value={this.state.user_name}
	              onChange={this.handleChange}
	            />
	          </FormGroup>

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
	            Signup
	          </Button>
	        </form>
	      </div>
		)
	};
}

export default Signup;