var map;

var geocoder;

var positionCustomer;

function initMap() {
  var uluru = {lat: 10.825914, lng: 106.714177};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  geocoder = new google.maps.Geocoder();
}

function geocodeAddress(geocoder, address, resultsMap) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      positionCustomer = results[0].geometry.location;
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      database.ref("cars/").orderByChild("ID").on("child_added", function(data) {
        if(data.val().ID == carNumber) {
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap(map);
          calculateAndDisplayRoute(directionsService, directionsDisplay, data.val().LocationCar, results[0].geometry.location);
        }
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(position, id, typeCar){
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: './icon1.png'
  });
  marker.infowindow = new google.maps.InfoWindow();
  marker.infowindow.setContent('ID: '+id+'<br>'+'Type: '+typeCar);
  marker.infowindow.open(map, marker);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}