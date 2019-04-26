// Visualizing-Data-with-Leaflet - logic.js

// Earthquakes & Tectonic Plates GeoJSON URL Variables
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Initialize & Create Two Separate LayerGroups: Earthquakes & Tectonic Plates
var earthquakes = new L.LayerGroup();
var tectonicPlates = new L.LayerGroup();

// Perform a GET Request to the earthquakesAPI URL
d3.json(earthquakesURL, function(data) {
    // Once a Response is Received, Send the data.features Object to the createFeatures Function
    createFeatures(data.features);
});
  
function createFeatures(earthquakeData) {
  
    // Define a Function to Run Once For Each Feature in the Features Array
    // Give Each Feature a Popup Describing the Place & Time of the Earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h4>Location: " + feature.properties.place + 
            "</h4><hr><p>Date & Time: " + new Date(feature.properties.time) + 
            "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
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
        id: "mapbox.light",
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
        "Fault Lines": tectonicPlates
    };

    // Create Map, Passing In satelliteMap, grayscaleMap & outdoorsMap Layers to Display on Load
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [satelliteMap, grayscaleMap, outdoorsMap]
    });

    // Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

//     // Set Up legend
//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson.options.limits;
//         var colors = geojson.options.colors;
//         var labels = [];

//         // Add Min & Max
//         var legendInfo = "<h1>Median Income</h1>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//         "</div>";

//         div.innerHTML = legendInfo;

//         limits.forEach(function(limit, index) {
//         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });

//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };

//   // Add Legend to the Map
//   legend.addTo(myMap);
}

createMap()