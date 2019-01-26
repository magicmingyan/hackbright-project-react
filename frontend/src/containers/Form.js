import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Signup">
				<form onSubmit={this.props.handleSubmit}>
					<FormGroup controlId="user_name" bsSize="large">
						<ControlLabel>User Name</ControlLabel>
						<FormControl
							autoFocus
							type="user_name"
							value={this.props.user_name}
							onChange={this.props.handleChange}
						/>
					</FormGroup>

					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus
							type="email"
							value={this.props.email}
							onChange={this.props.handleChange}
						/>
					</FormGroup>

					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							type="password"
							value={this.props.password}
							onChange={this.props.handleChange}
						/>
					</FormGroup>

					<Button
						block
						bsSize="large"
						disabled={!this.props.validateForm}
						type="submit"
					>
						Signup
					</Button>
				</form>
			</div>
		);
	}
}

export default Form;