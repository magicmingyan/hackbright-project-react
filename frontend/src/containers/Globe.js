import React, { Component } from 'react';
import $ from "jquery";
import axios from 'axios';
import ProgressBarExample from "./Progressbar";


class Globe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read_articles: [],
      total_articles_read: [],
      total_read_count: 0,
      total_available_count: 0
    }
  }

  onMarkerClick = (geo, earth) => {

        return ()=> {

          var read_marker = window.WE.marker([geo.latitude, geo.longitude],'https://worldisbeautiful.net/tpl/img/icon-marker-focus.png')
                    .addTo(earth)
                    .bindPopup('<a href={url}>{title}</a><br/><br/>'
                                .replace('{title}',geo.title)
                                .replace('{url}', geo.url)
                              +geo.abstract, {maxWidth: 300, 
                              closeButton: true})
                   

          this.setState((state) => ({read_articles: geo.id}))

          if (!this.state.total_articles_read.includes(geo.id)){
            this.setState({total_articles_read: this.state.total_articles_read.concat([geo.id])});
          } 

          this.setState((state) => ({total_read_count: this.state.total_articles_read.length}))
          console.log(this.state)

          fetch('http://localhost:5000/read_articles', {
            headers: {'x-access-token': window.localStorage.getItem('token')},
            credentials: 'include',
            method: 'POST',
            body: this.state.read_articles
          }) 
      }
  }


  componentDidMount() {

    const earth = new window.WE.map('earth_div',{
                zoom: 3,
                scrollWheelZoom: true
                });

    window.WE.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(earth);

    fetch('http://localhost:5000/geo.json',  {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => { return response.json()})
        .then(

          geos => {        
            let geo;
            for (let key in geos) {
                  geo = geos[key];
                  this.setState({ total_available_count: this.state.total_available_count + 1 })
                  var marker = window.WE.marker([geo.latitude, geo.longitude])
                    .addTo(earth)
                    .bindPopup('<a href={url}>{title}</a><br/><br/>'
                                .replace('{title}',geo.title)
                                .replace('{url}', geo.url)
                              +geo.abstract, {maxWidth: 300, 
                              closeButton: true})
                    .on('click', this.onMarkerClick(geo, earth))
                  ;
            }
          }
        );
  }

  render() {
    return (
      <>
      <div id="earth_div"></div>
      <ProgressBarExample 
        total_read_count={this.state.total_read_count} 
        total_available_count={this.state.total_available_count} />
      </>
    );
  }
}

export default Globe;