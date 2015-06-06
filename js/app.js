var Firebase = require('firebase')
var nmea = require("nmea")

var firebase_childsnapshot
var string_nmea
var string_nmea_parsed

var firebaseRef = new Firebase('https://torid-fire-8608.firebaseio.com');

firebaseRef.on('child_changed', function(firebase_childsnapshot, prevChildName) {
    // code to handle new child.
    console.log("Firebase JSON : ")
    console.log(firebase_childsnapshot)

    // TODO - parse firebase_childsnapshot to get string_nmea
    var string_nmea = firebase_childsnapshot
    console.log("NMEA Raw : ")
    console.log(string_nmea);

    try{
        var string_nmea_parsed = nmea.parse(string_nmea)
        console.log("NMEA Parsed : ")
        console.log(string_nmea_parsed)
    }
    catch(e){
        console.log("Error : ")
        console.log(e);
    }

    // TODO - update marker location and pan to new marker on parsing Lat & Long
});
