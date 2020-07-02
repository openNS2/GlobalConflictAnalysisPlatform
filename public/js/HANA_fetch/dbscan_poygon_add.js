dbscan_polygon_get = (events_obj) => {

    

    //MAPPING FUNCTIONS

    //The color scheme for all points with this specific crime category
dbscanColor = (d) => { 

    return d === "high" ? '#CA3907' :
    d === "medium"  ? '#DED406' :
    d === "low"   ?   '#60CA07':
        '#DAEAF3';
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


function resetHighlight(e) {
    dbscanLayer.resetStyle(e.target);
    info.updateDBSCAN();
}

function zoomToFeature(e) {
    
     

    map.fitBounds(e.target.getBounds());
    

    dbscanLayer.bringToBack();

 
}


     //highlights the object when hovering over it
     function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7,
            radius: 8
        });

        //error checking depending on the browser
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.updateDBSCAN(layer.feature.properties);
    }

    function style(feature) {
        return {
            radius: 6,
                    fillColor: 'steelblue',//acledColor(feature.properties.EVENT_TYPE),
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
        };
    }

    var dbscanLayer;



    var url = '/acledDBSCAN?battles='+encodeURIComponent(events_obj.battles)+'&explosions='+encodeURIComponent(events_obj.explosions)+
            '&protests='+encodeURIComponent(events_obj.protests)+'&riots='+encodeURIComponent(events_obj.riots)+'&strategic='+encodeURIComponent(events_obj.strategic)+
            '&violence='+encodeURIComponent(events_obj.violence)+'&region='+encodeURIComponent(events_obj.region)+'&year='+encodeURIComponent(events_obj.year)+' '

    fetch(url).then((response) => {

        response.json().then((data) => {
            if(data.error){
                return console.log(data.error)
            }

            console.log(data.data)
            
            var dbscanData = [];

            data.data.forEach((data) => {
                dbscanData.push({
                    "type": 'Feature',
                    'properties': {
                        // 'CONFIDENCE' : data.CONFIDENCE,
                        // 'SCORE': data.SCORE,
                        // // 'SHAPE': JSON.parse(data.SHAPE),
                        // 'CAPITAL': data.capital,
                        // 'COUNTRY': data.country,
                        // 'popupContent': 'Country: '+data.country+'\nCapital: '+data.capital+'\nSCORE: '+data.score
                    },
                    'geometry':JSON.parse(data.cluster), 
                })
            });

   

            dbscanLayer = L.geoJSON(dbscanData, {
                style: style,
                onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {

                    var geojsonMarkerOptions = {
                        radius: 6,
                        fillColor: 'red',//acledColor(feature.properties.EVENT_TYPE),
                        color: "white",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.5
                    };

                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
            })
            
            dbscanLayerGroup.addLayer(dbscanLayer);
          


        })
    })   

}