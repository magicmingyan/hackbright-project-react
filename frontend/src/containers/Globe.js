import React, { Component } from 'react';
import $ from "jquery";


class Globe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read_articles: []
    }
  }

  onMarkerClick = e => {
        // e.bindPopup("I have just clicked this marker.").openPopup();
        console.log(e.target)
        // e.target.openPopup();

        this.setState((state) => ({ read_articles: state.read_articles.concat("hi") }))
        console.log(this.state  )
  }

  componentDidMount() {



    const earth = new window.WE.map('earth_div',{
                zoom: 3,
                scrollWheelZoom: true
                });

    window.WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    $.get('http://localhost:5000/geo.json',  geos => {
        let geo;
        for (let key in geos) {
              geo = geos[key];
              var marker = window.WE.marker([geo.latitude, geo.longitude, geo.url])
                .addTo(earth)
                .bindPopup(geo.title+"<br/><br/>"+geo.abstract, {maxWidth: 300, closeButton: true})
                .on('click', this.onMarkerClick)
              ;
              // console.log(marker)
              // marker.bindPopup(geo.title+"<br/><br/>"+geo.abstract, {maxWidth: 120, closeButton: true});
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