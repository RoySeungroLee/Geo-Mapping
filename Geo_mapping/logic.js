// Create a map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 40;
}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);

function createMarkers(response) {

  // pull the "stations" property off of response.data
  var stations = response.features;
  // initialize an array to hold bike markers
  var bikeMarkers = [];

  // // loop through the stations array
  // for (var index = 0; index < stations.length; index++) {
  //   var station = stations[index];
  //   // for each station, create a marker and bind a popup with the station's name
  //   var bikeMarker = L.marker([station.geometry.coordinates[1], station.geometry.coordinates[0]])
  //     // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
  //   // add the marker to the bikeMarkers array
  //   bikeMarkers.push(bikeMarker);
  // }
  for (var index = 0; index < stations.length; index++) {
    var station = stations[index];
    L.circle([station.geometry.coordinates[1], station.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: selectColor(station.properties.mag),
      fillColor: selectColor(station.properties.mag),
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: (station.properties.mag)*9000}).addTo(myMap);}
  //   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  // }
  // create a layer group made from the bike markers array, pass it into the createMap function
  // createMap(L.layerGroup(bikeMarkers));
}

function selectColor(magnitude) {
  if (magnitude > 4){
    return "Red"
  }
  else if (magnitude >3){
    return "Orange"
  }
  else if (magnitude > 2) {
    return "Yellow"
  } 
  else {
    return "Green"
  }
}