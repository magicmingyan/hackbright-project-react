import React, { Component } from 'react';
import './App.css';
import $ from "jquery";


class App extends Component {
  componentDidMount() {
    // ** following two lines of code do the same thing
    // using the first version, however, could potentially cause errors
    // see "Referencing unimported libraries when using create-react-app"
    // $(this.refs.list).fadeOut(); # version 1

    const earth = new window.WE.map('earth_div',{
                zoom: 3,
                scrollWheelZoom: true
                });

    window.WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    $.get('http://localhost:5000/geo.json', function (geos) {
        console.log(geos)
        let geo;
        for (let key in geos) {
              geo = geos[key];
              const marker4 = window.WE.marker([geo.latitude, geo.longitude]).addTo(earth);
              marker4.bindPopup(geo.title, {maxWidth: 120, closeButton: true});
        }
    });
  }

  render() {
    return (

      <div id="earth_div"></div>
    );
  }
}

export default App;