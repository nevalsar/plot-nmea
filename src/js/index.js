var dallas = new google.maps.LatLng(32.927498, -96.752392);
var marker;
var map;
var nmea_textbox;

function initialize() {
    var mapOptions = {
      zoom: 17,
      center: dallas,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6
        },
        position: dallas,
        title:"Current Location"
    });

    setTimeout(function (){
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }, 1500);
    nmea_textbox = document.getElementById('nmea_text');
}

google.maps.event.addDomListener(window, 'load', initialize);
