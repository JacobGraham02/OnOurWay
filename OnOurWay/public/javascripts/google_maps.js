const google_maps_container = document.querySelector("#google-maps-gui");
const google_cloud_api_key = "AIzaSyAKz3oZ9x--Z_1py4gMmwS0ETUG112nXJY";

const address_text_field = document.querySelector("#address_text_field");
const postal_code_text_field = document.querySelector("#postal_code_text_field");
const locality_text_field = document.querySelector('#locality_text_field');
const country_text_field = document.querySelector('#country_text_field');

let map;
let autocomplete;
let geocoder;
const list_of_markers = [];
const list_of_addresses = [];
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(google_maps_container, {
        center: { lat: -34.397, lng: 131.644 },
        zoom: 8,
    });
    geocoder = new google.maps.Geocoder();
    new google.maps.places.Autocomplete(address_text_field);
    autocomplete = new google.maps.places.Autocomplete(address_text_field, {
        componentRestrictions: { country: ["us", "ca"]},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    address_text_field.focus();
    autocomplete.addListener("place_changed", fillInAddress);
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
            list_of_markers.push(marker);
        }
    });
}

function fillInAddress() {
    const place = autocomplete.getPlace();
    let address1 = "";
    let postalcode = "";
    let country = "";
    let locality = "";

    for (const component of place.address_components) {
        console.log(component.long_name + ' ' + component.types[0]);
        switch (component.types[0]) {
            case "street_number": {
                address1 = `${component.long_name} `;
                break;
            }
            case "route": {
                address1 += component.long_name;
                break;
            }
            case "locality": {
                locality = component.long_name;
                break;
            }
            case "postal_code": {
                postalcode = `${component.long_name}`;
                break;
            }
            case "country": {
                country = `${component.long_name}`;
                break;
            }
        }
    }
    const address = `${address1}, ${locality}, ${country}, ${postalcode}`;
    address_text_field.value = address1;
    country_text_field.value =  country;
    locality_text_field.value = locality;
    postal_code_text_field.value = postalcode;

    list_of_addresses.push(address);

    if (list_of_addresses.length > 1) {
      placeRouteBetweenTwoMarkers();
    } 
    createMapMarker(address);
}

window.initMap = initMap;