function initialize() {
  var earth = new WE.map('earth_div',{
  						zoom: 3,
  						scrollWheelZoom: true
  						});

  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

  $.get('/geo.json', function (geos) {
      let geo;
      for (let key in geos) {
            geo = geos[key];
            var marker4 = WE.marker([geo.latitude, geo.longitude]).addTo(earth);
            marker4.bindPopup(geo.title, {maxWidth: 120, closeButton: true});
      }
    });
}



