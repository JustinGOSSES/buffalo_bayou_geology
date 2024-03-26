latitude = 29.749907
longitude = -95.358421
initialZoom = 10

var geoData = L.map('geoData').setView([latitude, longitude], initialZoom );

let myStyles = {
    "color": "rgb(50, 50, 50)",
    "fillColor": "rgb(100, 100, 100)",
    "opacity": 0.76,
  };

fetch('data/texas_faults.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, { style: myStyles }).addTo(geoData);
    })
    .catch(error => {
        console.error('Error:', error);
    });

//////// HIDING THIS AS NOT CONVERTED TO LAT LONG BUT IN [3211684.2419351456, 13851777.147710562]
// fetch('data/topoElevationBuffaloBayouShapeNad834204_geojson.json')
//     .then(response => response.json())
//     .then(data => {
//         L.geoJSON(data, { style: myStyles }).addTo(geoData);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
    


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
}).addTo(geoData);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    tileSize: 512,
    zoomOffset: -1,
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
"StreetsLight": streetsLight,
"streetsBold": streetsBold,
};


L.control.layers(null, overlayMaps).addTo(macrostratMap);


var fieldData = fetch('data/BB_Outcrops and_faults.kmz')
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
                    kmltextMod = kmltext.replace(/\b(\d+_\d+\.jpg)\b/g, '/images/$1');
                    // Create new kml overlay
                    const parser = new DOMParser();
                    const kml = parser.parseFromString(kmltextMod, 'text/xml');
                    const track = new L.KML(kml);
                    geoData.addLayer(track);
                });

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
    circleClone.addTo(geoData)

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
        geoData.setView(center, macrostratMap.getZoom(), { animate: false });
    }
    ignoreNextZoom = false;
});

macrostratMap.on('move', function(e) {
    if (!ignoreNextZoom) {
        var center = macrostratMap.getCenter();
        map.setView(center, macrostratMap.getZoom(), { animate: false });
        geoData.setView(center, map.getZoom(), { animate: false });
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

geoData.on('zoomend', function(e) {
    ignoreNextZoom = true;
});

map.on('click', function(e) {
    mapClick(e)
});

macrostratMap.on('click', function(e) {
    mapClick(e)
});

map.on('zoomend', function(e) {
    ignoreNextZoom = true;
});

macrostratMap.on('zoomend', function(e) {
    ignoreNextZoom = true;
});


