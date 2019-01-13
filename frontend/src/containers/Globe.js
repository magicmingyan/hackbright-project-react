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

  onMarkerClick = (id) => {
        // e.bindPopup("I have just clicked this marker.").openPopup();
        return ()=> {
          this.setState((state) => ({read_articles: id}))
          if (!this.state.total_articles_read.includes(id)){
            this.setState({total_articles_read: this.state.total_articles_read.concat([id])});
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
            var marker1 = window.WE.marker([7.10304, 0.607458]).addTo(earth);
                marker1.bindPopup( '<div class="html-pop-content" data-titre="Wli Waterfalls" data-y="2019" data-m="01" data-d="07" data-img="Ghana _ Wli Waterfalls" data-pays="Ghana" data-iso="gh"></div>');
            
            var marker142 = window.WE.marker([-8.65163, 119.58], '../tpl/img/icon-marker-focus.png', 25, 41).addTo(earth);
                marker142.bindPopup( '<div class="html-pop-content" data-titre="Komodo National Park" data-y="2016" data-m="04" data-d="25" data-img="Indonesia _ Komodo National Park" data-pays="Indonesia" data-iso="id"></div>' );
              

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
                    .on('click', this.onMarkerClick(geo.id))
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