import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
import ProgressBarExample from "./Progressbar";

class Globe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read_articles: [],
      total_articles_read: new Set(),
      total_available_count: 0
    };
  }

  onMarkerClick = (geo, earth) => {
    return () => {
      let read_marker = window.WE.marker(
        [geo.latitude, geo.longitude],
        "https://worldisbeautiful.net/tpl/img/icon-marker-focus.png"
      )
        .addTo(earth)
        .bindPopup(
          "<a href={url}>{title}</a><br/><br/>"
            .replace("{title}", geo.title)
            .replace("{url}", geo.url) + geo.abstract,
          { maxWidth: 300, closeButton: true }
        );

      this.setState({ read_articles: geo.id });

      if (!this.state.total_articles_read.has(geo.id)) {
        this.setState(({ total_articles_read }) => ({
          total_articles_read: new Set(total_articles_read.add(geo.id))
        }));
      }

      console.log(this.state.total_articles_read.size);

      fetch("http://localhost:5000/read_articles", {
        headers: { "x-access-token": window.localStorage.getItem("token") },
        credentials: "include",
        method: "POST",
        body: this.state.read_articles
      });
    };
  };

  componentDidMount() {
    const earth = new window.WE.map("earth_div", {
      zoom: 3,
      scrollWheelZoom: true
    });

    window.WE.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    ).addTo(earth);

    // async function
    fetch("http://localhost:5000/read_event.json", {
      headers: { "x-access-token": window.localStorage.getItem("token") },
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(read_events => {
        let value;
        for (let key in read_events) {
          value = read_events[key];
          if (!this.state.total_articles_read.has(value)) {
            this.setState(({ total_articles_read }) => ({
              total_articles_read: new Set(total_articles_read.add(value))
            }));
          }
        }
      })
      .then(() =>
        fetch("http://localhost:5000/geo.json", {
          method: "GET",
          credentials: "include"
        })
          .then(response => {
            return response.json();
          })
          .then(geos => {
            let geo;
            for (let key in geos) {
              geo = geos[key];
              this.setState({
                total_available_count: this.state.total_available_count + 1
              });

              if (!this.state.total_articles_read.has(geo.id)) {
                var marker = window.WE.marker([
                  geo.latitude,
                  geo.longitude
                ]).addTo(earth);
              } else {
                var marker = window.WE.marker(
                  [geo.latitude, geo.longitude],
                  "https://worldisbeautiful.net/tpl/img/icon-marker-focus.png"
                ).addTo(earth);
              }
              marker
                .bindPopup(
                  "<a href={url}>{title}</a><br/><br/>"
                    .replace("{title}", geo.title)
                    .replace("{url}", geo.url) + geo.abstract,
                  { maxWidth: 300, closeButton: true }
                )
                .on("click", this.onMarkerClick(geo, earth));
            }
          })
      );
  }

  render() {
    return (
      <>
        <div id="earth_div" />
        <ProgressBarExample
          total_read_count={this.state.total_articles_read.size}
          total_available_count={this.state.total_available_count}
        />
      </>
    );
  }
}

export default Globe;