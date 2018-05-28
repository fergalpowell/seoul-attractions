
var map = L.map('map', { zoomControl:true }).setView([37.543787, 126.990226], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

markerClusters = L.markerClusterGroup();

var locations_list = [];

$.ajax({url: "attractions", success: function(data){
    new L.GeoJSON(data, {
        onEachFeature: function (feature) {
            var m = L.marker(feature.geometry.coordinates).bindPopup(feature.properties);
            markerClusters.addLayer(m);
            locations_list.push([feature.properties,feature.geometry.coordinates]);
        }
    });
    map.addLayer( markerClusters );
    LocationTable();
    Locate();
}});



function LocationTable(){
    var table = document.createElement('table');
    table.className = 'table';
    var tbody = document.createElement('tbody');
    for (var i = 0; i < locations_list.length; i++){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = String(i + 1) + ") " + locations_list[i][0];
        var button = document.createElement('button');
        button.className = "btn btn-primary";
        button.innerHTML = "View";
        let index = i;
        button.onclick = function(){ShowAttraction(index)};
        td.appendChild(button);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    var output = document.getElementById('attractions');
    output.appendChild(table);
}

function ShowAttraction(index){
    map.setView([locations_list[index][1][0],
        locations_list[index][1][1]], 17);
    markerClusters.eachLayer(function(layer){
        if(layer._latlng.lat == locations_list[index][1][0] && layer._latlng.lon == locations_list[index][1][1]){
            console.log(layer.getAllChildMarkers());
        }
    });
}

function Locate(){
    map.locate({setView: true, maxZoom: 13});
    map.on('locationfound', onLocationFound);
}

function onLocationFound(e){
    new L.marker(e.latlng, {
            draggable: false,
        }).bindPopup("You are here!")
        .addTo(map);
}