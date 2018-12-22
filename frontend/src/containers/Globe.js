import React, { Component } from 'react';
import $ from "jquery";


class Globe extends Component {
  componentDidMount() {

    const earth = new window.WE.map('earth_div',{
                zoom: 3,
                scrollWheelZoom: true
                });

    window.WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    // $.post('http://localhost:5000/result', "ming@gmail.com", ()=>console.log("success!"))

    $.get('http://localhost:5000/geo.json',  geos => {
        let geo;
        for (let key in geos) {
              geo = geos[key];
              var marker = window.WE.marker([geo.latitude, geo.longitude]).addTo(earth);
              var popup = marker.bindPopup(geo.title+"<br/>"+geo.abstract, {maxWidth: 120, closeButton: true});
        }
    });

    

  }

  render() {
    return (

      <div id="earth_div"></div>
    );
  }
}

export default Globe;