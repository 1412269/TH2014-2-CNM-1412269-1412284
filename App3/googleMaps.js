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
      console.log("Geocode xong");
      database.ref("cars/").orderByChild("ID").on("child_added", function(data) {
        if(data.val().ID == carNumber) {
          console.log(data.val().LocationCar)
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

var labelCar = [];
var xeSanSang = [];

function addMarker(position, destination, id){
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: './icon.png',
    title: destination
  });
  labelCar.push(marker);
  marker.infowindow = new google.maps.InfoWindow();
  marker.infowindow.setContent(destination+'\n'+'ID: '+id);
  marker.infowindow.open(map, marker);
}

function getDistance(destination, distanceLimited, typeCar, callback){
  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [positionCustomer],
    destinations: [destination.LocationCar],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;

      // console.log(originList);
      // console.log(destinationList);
      // console.log(response.rows[0].elements[0].distance.value);
      destination.distance = response.rows[0].elements[0].distance.value;
      destination.desAddresses = destinationList[0];
      if((response.rows[0].elements[0].distance.value <= distanceLimited)&&(destination.Type==typeCar)){
        xeSanSang.push(destination);
        // addMarker(destination.LocationCar, destinationList[0]);
      }
    }
    callback();
  });
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