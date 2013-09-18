// JavaScript Leaflet example
// W.Boasson (2013)

// Create map object
var map = L.map('map', {dragging: true, touchZoom: true}).setView([52.0, 5.5], 6);

// A few functions
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

// Add eventlisteners to the map
map.on('locationfound', onLocationFound);
map.on('click', onMapClick);

// Create the OSM baselayer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 6, maxZoom: 20, crs: L.CRS.EPSG3857, attribution: osmAttrib});

// Create wms baselayers
var nlBaseMap = L.tileLayer.wms(wmsserver_gmd, {
  layers: 'nl_contour',
  format: 'image/png',
  transparent: true,
  crs: L.CRS.EPSG3857,
  attribution: "NL contour"
});

var rlpGeologie = L.tileLayer.wms(wmsserver_gmd, {
  layers: 'rlp_geologische_uebersichtskarte',
  format: 'image/png',
  transparent: true,
  crs: L.CRS.EPSG3857,
  attribution: "Geologische Uebersichtkarte Rheinland-Pfalz"
});

// Add baselayers
osm.addTo(map);
nlBaseMap.addTo(map);
rlpGeologie.addTo(map); 

// Add a few markers
L.marker([53.0, 5.5]).addTo(map)
  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

L.circle([52.8, 6.5], 15000, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}).addTo(map).bindPopup("I am a circle.");

L.polygon([
  [52.0, 6.0],
  [52.5, 6.5],
  [52.5, 6.0]
]).addTo(map).bindPopup("I am a polygon.");

var popup = L.popup();

var baseMaps = {
    "Open Streetmap": osm
};

var overlayMaps = {
    "NL Contour": nlBaseMap,
    "Geologie RLP": rlpGeologie
};
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Set the location
map.locate({setView: true, maxZoom: 16});

// EOF

