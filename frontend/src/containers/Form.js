import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Form.css";


class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.props.className}>
				<form onSubmit={this.props.handleSubmit}>
					{this.props.className == "Signup" && (
						<FormGroup controlId="user_name" bsSize="large">
							<ControlLabel>User Name</ControlLabel>
							<FormControl
								autoFocus
								type="user_name"
								value={this.props.user_name}
								onChange={this.props.handleChange}
							/>
						</FormGroup>
					)}

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
						bsSize="large"
						disabled={!this.props.validateForm}
						type="submit"
					>
						{this.props.className}
					</Button>
					{this.props.className != "Signup" ? (
						<>
							<br/>
							<br/>
							<h4>Don't have an account? </h4>
							<form onSubmit={this.handleRegister}>
								<Button
									
									bsSize="large"
									type="submit"
									href="/signup"
								>
									Signup
								</Button>
							</form>
						</>
					) : (
						<>
							<br/>
							<br/>
							<h4>Already have an account? </h4>
							<form onSubmit={this.handleRegister}>
								<Button
									
									bsSize="large"
									type="submit"
									href="/login"
								>
									Login
								</Button>
							</form>
						</>
					)}
				</form>
			</div>
		);
	}
}

export default Form;