const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const google_maps_container = document.querySelector("#google-maps-gui");
const carpool_address_section = document.querySelector("#carpool_address_section");
const carpool_address_container = document.querySelector("#carpool_address_container");
const carpool_li_starting_address = document.querySelector("#carpool_list_item_start_address");
const carpool_li_ending_address = document.querySelector("#carpool_list_item_end_address");
const carpool_li_maximum_passengers = document.querySelector("#carpool_list_item_maximum_passengers");
const list_of_addresses = [];

function initMap() {
    const carpool_starting_address = carpool_li_starting_address.textContent;
    const carpool_ending_address = carpool_li_ending_address.textContent;
    list_of_addresses.push(carpool_starting_address);
    list_of_addresses.push(carpool_ending_address);

    map = new google.maps.Map(google_maps_container, {
        center: { lat: -34.397, lng: 131.644 },
        zoom: 8,
    });
    createMapMarker(carpool_starting_address);
    createMapMarker(carpool_ending_address);
    placeRouteBetweenTwoMarkers()
};

function createMapMarker(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
            marker.setMap(map);
        }
    });
}

function placeRouteBetweenTwoMarkers() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer(); 
    directionsRenderer.setMap(map);
    const start_location = list_of_addresses[0];
    const end_location = list_of_addresses[1];

    const travel_request = {
        origin: start_location,
        destination: end_location,
        travelMode: 'DRIVING'
    };
    directionsService.route(travel_request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } 
    });
}