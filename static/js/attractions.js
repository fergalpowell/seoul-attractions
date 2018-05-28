
var map = L.map('map', { zoomControl:true }).setView([37.543787, 126.990226], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

markerClusters = L.markerClusterGroup();

$.ajax({url: "attractions", success: function(data){
    console.log(data);
    new L.GeoJSON(data, {
        onEachFeature: function (feature) {
            console.log(feature);
            var m = L.marker(feature.geometry.coordinates).bindPopup(feature.properties);
            markerClusters.addLayer(m);
        }
    });
}});

map.addLayer( markerClusters );

