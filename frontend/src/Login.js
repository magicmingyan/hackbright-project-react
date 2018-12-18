import React, { Component } from 'react';
import Input from './components/Input';  
import TextArea from './components/TextArea';  
import Select from './components/Select';
import Button from './components/Button'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	    this.handleTextArea = this.handleTextArea.bind(this);
	    this.handleFullName = this.handleFullName.bind(this);
	    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	    this.handleClearForm = this.handleClearForm.bind(this);
	    this.handleInput = this.handleInput.bind(this);
	}

	handleFullName(e) {
	   let value = e.target.value;
	   this.setState( prevState => ({ newUser : 
	        {...prevState.newUser, name: value
	        }
	      }), () => console.log(this.state.newUser))
    }

    handleFormSubmit() {
    // Form submission logic
    }
    handleClearForm() {
    // Logic for resetting the form
    }

    handleTextArea() {

    }

    handleInput() {
    	
    }

	render() {
		return (
	      <form className="container" onSubmit={this.handleFormSubmit}>

	        <Input /> {/* Name of the user */}
	        <Input /> {/* Input for Age */} 
	        <Select /> {/* Gender Selection */}
	        <TextArea /> {/* About you */}
	        <Button /> { /*Submit */ }
	        <Button /> {/* Clear the form */}
	      </form>



					
		);
	}
}

export default Login;
