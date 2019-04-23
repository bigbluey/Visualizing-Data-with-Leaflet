// Visualizing-Data-with-Leaflet - logic.js

var earthquakesAPI = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php"
var platesAPI = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET Request to the earthquakesAPI URL
d3.json(earthquakesAPI, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});
  
function createFeatures(earthquakeData) {
  
    // Define a Function to Run Once For Each Feature in the Features Array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    // Create a GeoJSON Layer Containing the Features Array on the EarthquakeData Object
    // Run the onEachFeature Function Once For Each Piece of Data in the Array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send the Earthquakes Layer to the createMap Function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define Variables for Tile Layers
    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
    });

    var grayscaleMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.grayscale",
    accessToken: API_KEY
    });

    var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
    });

    // Define baseMaps Object to Hold Base Layers
    var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayscaleMap,
    "Outdoors": outdoorsMap
    };

    // Create Overlay Object to Hold Overlay Layers
    var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicplates
    };

    // Create a Layer Control
    // Pass in baseMaps and overlayMaps
    // Add the Layer Control to the Map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}