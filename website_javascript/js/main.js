latitude = 29.749907
longitude = -95.4584
initialZoom = 10

var baseUrl = window.location.protocol + "//" + window.location.host + "/";
var fullUrl = window.location.href;



// Define the WGS84 projection
// var wgs84 = proj4('EPSG:4326');

// Define the Web Mercator projection
// var webMercator = proj4('EPSG:3857');

// Function to convert lat/lon to Web Mercator
// function convertLatLonToWebMercator(lat, lon) {
//     return proj4(wgs84, webMercator, [lon, lat]);
// }

// Function to convert all points in a GeoJSON to Web Mercator
// function convertGeoJSONToWebMercator(geojson) {
//     geojson.features.forEach(function(feature) {
//         if (feature.geometry.type === "Point") {
//             var lat = feature.geometry.coordinates[1];
//             var lon = feature.geometry.coordinates[0];
//             var convertedCoords = convertLatLonToWebMercator(lon, lat);
//             //var convertedCoords = [lon, lat];
//             feature.geometry.coordinates = convertedCoords;
//         }
//     });
//     return geojson;
// }

//////// HIDING THIS AS NOT CONVERTED TO LAT LONG BUT IN [3211684.2419351456, 13851777.147710562]
// fetch('data/topoElevationBuffaloBayouShapeNad834204_geojson.json')
//     .then(response => response.json())
//     .then(data => {
//         L.geoJSON(data, { style: myStyles }).addTo(geoData);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
    


async function getGeologyData(lat, lng) {
    const url =  `https://macrostrat.org/api/geologic_units/map/?lat=${lat}&lng=${lng}&response=long`
    return fetch(url)
      .then(
        response => response.json()
        )
      ;
  }

var geoData = L.map('geoData').setView([latitude, longitude], initialZoom );
var geoDataLarge = L.map('geoDataLarge').setView([latitude, longitude], 15 );

let myStyles = {
    "color": "rgb(50, 50, 50)",
    "fillColor": "rgb(100, 100, 100)",
    "opacity": 0.76,
  };


  var fieldData_layer_largeMap = L.layerGroup();
  var wells_layer_largeMap = L.layerGroup();
  
  var fieldData_layer_smallMap = L.layerGroup();
  var wells_layer_smallMap = L.layerGroup();
  var faults_layer_smallMap = L.layerGroup();
  

fetch('data/texas_faults.json')
    .then(response => response.json())
    .then(data => {
        var faults = L.geoJSON(data, { style: myStyles }) //.addTo(geoData);
        geoData.addLayer(faults);
        faults_layer_smallMap.addLayer(faults);

    })
    .catch(error => {
        console.error('Error:', error);
    });



var map = L.map('map').setView([latitude, longitude], initialZoom );

var openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

var openstreet2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(geoData);


var esriTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 16
}).addTo(geoDataLarge);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(geoData);

var esriTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 16
}).addTo(geoData);

var macrostratMap = L.map('macrostrat-map').setView([latitude, longitude], initialZoom );

L.tileLayer('https://tiles.macrostrat.org/carto/{z}/{x}/{y}.png', {
    attribution: '<a href="https://macrostrat.org/">Macrostrat</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(macrostratMap);



 // Add a street map overlay
var streetsLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    opacity: 0.25,
attribution: 'Street Map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});
var streetsBold = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    opacity: 0.65,
attribution: 'Street Map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});


var overlayMaps = {
    "streets Bold transparency": streetsBold,
"Streets Light transparency": streetsLight,
"macrostratMap": macrostratMap
};

L.control.layers(overlayMaps).addTo(macrostratMap);


var url_main_kmz_field_data = "data/BB_outcrops022025.kmz"

var fieldData = fetch(url_main_kmz_field_data)
//var fieldData = fetch('data/BB_Outcrops and_faults.kmz')
.then(function (response) {
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response.blob());
    } else {
        return Promise.reject(new Error(response.statusText));
    }
    })
    .then(JSZip.loadAsync)
    .then(function (zip) {
    console.log("zip",zip)
    return zip.file("doc.kml").async("string");
    })
    .then(function success(kmltext) {
                    //kmltextMod = kmltext.replace(/\b(\d+_\d+\.jpg)\b/g, fullUrl+'/data/BB_outcrops_022025_kmz_unzipped_images/$1');
                    kmltextMod = kmltext.replace(/\b([\w\-]+\.(jpg|png))\b/gi, fullUrl + '/data/BB_outcrops_022025_kmz_unzipped_images/$1');
                    // Create new kml overlay
                    const parser = new DOMParser();
                    const kml = parser.parseFromString(kmltextMod, 'text/xml');
                    const track = new L.KML(kml);
                    geoData.addLayer(track);
                    fieldData_layer_smallMap.addLayer(track);
                });

var fieldData2 = fetch(url_main_kmz_field_data)
// var fieldData2 = fetch('data/BB_Outcrops and_faults.kmz')
.then(function (response) {
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response.blob());
    } else {
        return Promise.reject(new Error(response.statusText));
    }
    })
    .then(JSZip.loadAsync)
    .then(function (zip) {
    console.log("zip",zip)
    return zip.file("doc.kml").async("string");
    })
    .then(function success(kmltext) {
                    //kmltextMod = kmltext.replace(/\b(\d+_\d+\.jpg)\b/g, fullUrl+'/data/BB_outcrops_022025_kmz_unzipped_images/$1');
                    kmltextMod = kmltext.replace(/\b([\w\-]+\.(jpg|png))\b/gi, fullUrl + '/data/BB_outcrops_022025_kmz_unzipped_images/$1');
                    // Create new kml overlay
                    const parser = new DOMParser();
                    const kml = parser.parseFromString(kmltextMod, 'text/xml');
                    const track = new L.KML(kml);
                    geoDataLarge.addLayer(track);
                    fieldData_layer_largeMap.addLayer(track);
                });

var wellData1 = fetch('data/wells_v1.geojson')
                .then(response => response.json())
                .then(data => {
                    const wells = new L.geoJSON(data, {
                        pointToLayer: function(feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 5, // Adjust the radius to make the circle smaller
                                color: '#800080', // Optional: set the color of the circle
                                fillColor: '#3388ff', // Optional: set the fill color of the circle
                                fillOpacity: 0.5 // Optional: set the fill opacity
                            }).bindPopup("well pseudoname: " + feature.properties.name + ", ground_level: " + feature.properties.ground_level_feet + " in Ft.");
                        }
                    });
                    geoData.addLayer(wells);
                    wells_layer_smallMap.addLayer(wells)
                })
                .catch(error => {
                    console.error('Error:', error, "error was related to wellData1");
                });

var wellData2 = fetch('data/wells_v1.geojson')
                .then(response => response.json())
                .then(data => {
                    const wells = new L.geoJSON(data, {
                        pointToLayer: function(feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 5, // Adjust the radius to make the circle smaller
                                color: '#800080', // Optional: set the color of the circle
                                fillColor: '#3388ff', // Optional: set the fill color of the circle
                                fillOpacity: 0.5 // Optional: set the fill opacity
                            }).bindPopup("name: " + feature.properties.name + ", ground_level: " + feature.properties.ground_level_feet + " in Ft.");
                        }
                    });
                    geoDataLarge.addLayer(wells);
                    wells_layer_largeMap.addLayer(wells);
                })
                .catch(error => {
                    console.error('Error:', error, "error was related to wellData1");
                });



// Add the layer control to the map
var overlayData = {
    "fieldData_layer_largeMap": fieldData_layer_largeMap,
    "wells_layer_largeMap": wells_layer_largeMap
};

L.control.layers(null, overlayData).addTo(geoDataLarge);

// var fieldData_layer_smallMap = L.layerGroup();
// var wells_layer_smallMap = L.layerGroup();

var overlayDataSmallMap = {
    "fieldData": fieldData_layer_smallMap,
    "wells": wells_layer_smallMap,
    "faults": faults_layer_smallMap
};

L.control.layers(null, overlayDataSmallMap).addTo(geoData);


//.var data_layers_group = L.layerGroup([fieldData_layer_largeMap, wells_layer_largeMap]);

// var overlayMaps = {
//     "data_layers_group": data_layers_group
// };

//var layerControl = L.control.layers(overlayMaps).addTo(geoData);

//L.control.layers(null, overlayData).addTo(geoData);

// add the OpenTopoMap tile layer to the map
topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Rendering: &copy; <a href="https://opentopomap.org/about">OpenTopoMap</a>'
})
  
  L.control.layers({
    "openstreet": openstreet,
    "topo": topo,
  }, null, {
    collapsed: false
  }).addTo(map);

  openstreet.addTo(map)

  L.control.layers({
    "openstreet": openstreet2,
    "esriTopo": esriTopo,
    "Esri_WorldImagery": Esri_WorldImagery
  }, null, {
    collapsed: false
  }).addTo(geoData);

  Esri_WorldImagery.addTo(geoData)

function mapClick(e){
    var latlng = e.latlng;
    lat = document.getElementById("latP")
    console.log("clicked lat",lat)
    lat.innerHTML = latlng.lat.toFixed(6);
    lng = document.getElementById("lngP")
    lng.innerHTML = latlng.lng.toFixed(6);
    var circle = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 50
    })
    circle.addTo(map);
    // circle.addTo(macrostratMap);
    // circle.addTo(macrostratMap);
    var circleClone = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 50
    })
    var circleClone3 = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 50
    })
    circleClone.addTo(macrostratMap)
    circleClone3.addTo(geoData)

    var streetview = new google.maps.StreetViewPanorama(document.getElementById("streetview"), {
        position: {lat: latlng.lat, lng: latlng.lng},
        pov: {heading: 165, pitch: 0},
        zoom: 1
    });

    // var streetviewMarker = new google.maps.Marker({
    //     position: {lat: latlng.lat, lng: latlng.lng},
    //     map: streetview
    // });

    getGeologyData(latlng.lat, latlng.lng).then(data => {
            console.log("data",data)
            const macrostratPointDiv = document.getElementById("macrostratPoint")
            const resultsHolder = document.getElementById("results")
            resultsHolder.innerHTML = ""
            
            data =  data["success"]["data"]
            try {
                // data = data.slice(0, 2)
                // data.sort((a, b) => a.b_age.localeCompare(b.b_age));
                data = data.slice(1, 2)
              }
              catch(err) {
                data = data
              }
            for (let i = 0; i < data.length; i++) {
                const result = data[i];
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result');

                const title = document.createElement('h4');
                title.textContent = result.name;
                resultDiv.appendChild(title);

                const age_words = document.createElement('p');
                age_words.textContent = "AGE: "+result.t_int_name+" to "+result.b_int_name                 ;
                resultDiv.appendChild(age_words);

                const age_range = document.createElement('p');
                age_range.textContent = "AGE: "+result.t_age+" to "+result.b_age+" millions years"                        ;
                resultDiv.appendChild(age_range);

                const lithSingular = document.createElement('p');
                lithSingular.textContent = "Lith: "+result.lith                        ;
                resultDiv.appendChild(lithSingular);

                const description = document.createElement('p');
                description.textContent = result.descrip;
                resultDiv.appendChild(description);

                const comments = document.createElement('p');
                description.textContent = result.comments;
                resultDiv.appendChild(comments);

                const source = document.createElement('p');
                source.textContent = "source ID ="+result.source_id                        ;
                resultDiv.appendChild(source);

                resultsHolder.append(resultDiv);
            };
            console.log("data",data)
        }
    );
}

var ignoreNextZoom = false;

map.on('move', function(e) {
    if (!ignoreNextZoom) {
        var center = map.getCenter();
        macrostratMap.setView(center, map.getZoom(), { animate: false });
        geoData.setView(center, map.getZoom(), { animate: false });
    }
    ignoreNextZoom = false;
});

macrostratMap.on('move', function(e) {
    if (!ignoreNextZoom) {
        var center = macrostratMap.getCenter();
        map.setView(center, macrostratMap.getZoom(), { animate: false });
        geoData.setView(center, macrostratMap.getZoom(), { animate: false });
    }
    ignoreNextZoom = false;
});

geoData.on('move', function(e) {
    if (!ignoreNextZoom) {
        var center = geoData.getCenter();
        map.setView(center, geoData.getZoom(), { animate: false });
        macrostratMap.setView(center, geoData.getZoom(), { animate: false });
    }
    ignoreNextZoom = false;
});




geoData.on('click', function(e) {
    mapClick(e)
});

map.on('click', function(e) {
    mapClick(e)
});

macrostratMap.on('click', function(e) {
    mapClick(e)
});

geoData.on('zoomend', function(e) {
    ignoreNextZoom = true;
});

map.on('zoomend', function(e) {
    ignoreNextZoom = true;
});

macrostratMap.on('zoomend', function(e) {
    ignoreNextZoom = true;
});


