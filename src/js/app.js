var Firebase = require('firebase')
var nmea = require("nmea")

var firebaseRef = new Firebase('https://torid-fire-8608.firebaseio.com');
var nmea_location

firebaseRef.on('child_changed', function(firebase_childsnapshot, prevChildName) {
    // code to handle new child.
    console.log("Firebase Snapshot: ")
    console.log(firebase_childsnapshot)

    var string_nmea = firebase_childsnapshot.val()
    console.log("NMEA Raw : ")
    console.log(string_nmea);

    try{
        var string_nmea_parsed = nmea.parse(string_nmea)
        console.log("NMEA Parsed : ")
        console.log(string_nmea_parsed)

        var nmea_lat = string_nmea_parsed.lat/100;
        nmea_lat = (string_nmea_parsed.latPole === "N")? nmea_lat: -nmea_lat;
        var nmea_lon = string_nmea_parsed.lon/100;
        nmea_lon = (string_nmea_parsed.lonPole === "E")? nmea_lon: -nmea_lon;
        console.log("Lat = " + nmea_lat, " Long = ", nmea_lon);

        nmea_location = new google.maps.LatLng(nmea_lat, nmea_lon);
        marker.setPosition(nmea_location)
        map.panTo(nmea_location)
    }
    catch(e){
        console.log("NMEA parse error : ")
        console.log(e);
    }
});
