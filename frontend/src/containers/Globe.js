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

      fetch("http://52.10.20.102/read_articles", {
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

    const first_request = async () => {
      const response = await fetch("http://52.10.20.102/read_event.json", {
        headers: { "x-access-token": window.localStorage.getItem("token") },
        method: "GET",
        credentials: "include"
      });
      const read_events = await response.json();

      let value;
      for (let key in read_events) {
        value = read_events[key];
        if (!this.state.total_articles_read.has(value)) {
          let total_articles_read = new Set(
            this.state.total_articles_read.add(value)
          );
          this.setState({ total_articles_read: total_articles_read });
        }
      }
    };

    const second_request = async () => {
      await first_request();
      const response = await fetch("http://52.10.20.102/geo.json", {
        method: "GET",
        credentials: "include"
      });
      const articles = await response.json();

      let article;
      for (let key in articles) {
        article = articles[key];
        this.setState({
          total_available_count: this.state.total_available_count + 1
        });
        let marker;
        if (!this.state.total_articles_read.has(article.id)) {
          marker = window.WE.marker([article.latitude, article.longitude]).addTo(earth);
        } else {
          marker = window.WE.marker(
            [article.latitude, article.longitude],
            "https://worldisbeautiful.net/tpl/img/icon-marker-focus.png"
          ).addTo(earth);
        }
        marker
          .bindPopup(
            "<a href={url}>{title}</a><br/><br/>"
              .replace("{title}", article.title)
              .replace("{url}", article.url) + article.abstract,
            { maxWidth: 300, closeButton: true }
          )
          .on("click", this.onMarkerClick(article, earth));
      }
    };

    second_request();
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
