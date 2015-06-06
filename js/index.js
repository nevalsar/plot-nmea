var stockholm = new google.maps.LatLng(59.32522, 18.07002);
var marker;
var map;

function initialize() {
    var mapOptions = {
      zoom: 4,
      center: stockholm
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: stockholm,
        title:"Location : StockHolm"
    });

    setTimeout(function (){
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }, 1500);
}

google.maps.event.addDomListener(window, 'load', initialize);
