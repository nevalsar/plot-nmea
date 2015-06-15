var serialport = require("serialport")
var nmea = require("nmea-0183")

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
            nmea_location = new google.maps.LatLng(nmeaObj.latitude, nmeaObj.longitude);
            marker.setPosition(nmea_location)
            map.panTo(nmea_location)
        }
    }
    catch(e){
        console.log("NMEA string parse error : ")
        console.log(e)
    }
}
