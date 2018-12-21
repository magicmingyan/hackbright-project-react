import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Read the globe</h1>
          <p>A simple app to read news around the world</p>
        </div>
      </div>
    );
  }
}