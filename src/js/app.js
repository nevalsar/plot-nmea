var serialport = require("serialport")
var nmea = require("nmea-0183")

var nmeaObj

var SerialPort = new serialport.SerialPort("COM6", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
}, false)

SerialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error)
  } else {
    console.log('Opened serial port')

    SerialPort.on('data', function(data) {
      setTimeout(updateNMEA, 2000, data)
    });
  }
});

function updateNMEA (string_nmea) {
    try{
        nmeaObj = nmea.parse(string_nmea)
        console.log("NMEA Parsed : ")
        console.log(nmeaObj)

        console.log("Lat = " + nmeaObj.latitude, " Long = ", nmeaObj.longitude);

        if (!isNaN(nmeaObj.latitude) && !isNaN(nmeaObj.longitude)) {
            console.log("Updating UI")
            nmea_textbox.textContent = string_nmea

            var newPosition = new google.maps.LatLng(nmeaObj.latitude, nmeaObj.longitude);
            var currentPosition = marker.getPosition()

            var heading = google.maps.geometry.spherical.computeHeading(currentPosition, newPosition);

            if (google.maps.geometry.spherical.computeDistanceBetween (newPosition, currentPosition) > 5) {
                marker.setIcon({
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 6,
                    rotation: heading
                });
            }

            marker.setPosition(newPosition)
            map.panTo(newPosition)
        }
    }
    catch(e){
        console.log("NMEA string parse error : ")
        console.log(e)
    }
}
