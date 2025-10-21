mapboxgl.accessToken = mapBoxToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listInfo.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

  // create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  `<h5>${listInfo.title}</h5> <p>Exact location provided after booking.<p>`
);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color: '#FE5052'})
  .setLngLat(listInfo.geometry.coordinates)
  .setPopup(popup) // sets a popup on this marker
  .addTo(map);
