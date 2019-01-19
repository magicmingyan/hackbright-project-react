import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {


  handleLogOut = () => {
    window.localStorage.removeItem('token')
  }

  render() {

    if (window.localStorage.getItem('token')){
      return (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem href="/" onClick={this.handleLogOut}>Logout</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
        )
    } else {
      return (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem href="/signup">Signup</NavItem>
                <NavItem href="/login">Login</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
      );
    } 
  } 
}

export default App;