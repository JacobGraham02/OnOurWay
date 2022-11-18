const google_maps_container = document.querySelector("#google-maps-gui");
const google_cloud_api_key = "AIzaSyAKz3oZ9x--Z_1py4gMmwS0ETUG112nXJY";

const address_text_field = document.querySelector("#address_text_field");
const postal_code_text_field = document.querySelector("#postal_code_text_field");
const locality_text_field = document.querySelector('#locality_text_field');
const country_text_field = document.querySelector('#country_text_field');

const address_2_text_field = document.querySelector("#address_2_text_field");
const postal_2_code_text_field = document.querySelector("#postal_code_2_text_field");
const locality_2_text_field = document.querySelector('#locality_2_text_field');
const country_2_text_field = document.querySelector('#country_2_text_field');

const form_submit_button = document.querySelector('#submit_form_button');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const carpool_start_address = urlParams.get('starting_address');
const carpool_ending_address = urlParams.get('ending_address');

form_submit_button.addEventListener('click', (e) => {
    e.preventDefault;
});

let map;
let geocoder;
const list_of_markers = [];
const list_of_addresses = [];
let directionsService;
let directionsRenderer;

function initMap() {
    let address1 = "";
    let address2 = "";
    map = new google.maps.Map(google_maps_container, {
        center: { lat: -34.397, lng: 131.644 },
        zoom: 8,
    });

    geocoder = new google.maps.Geocoder();
    new google.maps.places.Autocomplete(address_text_field);
    new google.maps.places.Autocomplete(address_2_text_field);
    const auto_complete_1 = new google.maps.places.Autocomplete(address_text_field, {
        componentRestrictions: { country: ["ca"]},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    const auto_complete_2 = new google.maps.places.Autocomplete(address_2_text_field, {
        componentRestrictions: { country: ["ca"]},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    auto_complete_1.addListener("place_changed", function() {
        address1 = calculateAddress(auto_complete_1);
        fillInAddressFieldsAddress1(address1);
    });

    auto_complete_2.addListener("place_changed", function() {
        address2 = calculateAddress(auto_complete_2);
        fillInAddressFieldsAddress2(address2);
    });
    if (carpool_start_address && carpool_ending_address !== undefined) {
        auto_complete_1.value = "14 Charles Court, Barrie, Canada L4N 6S8";
        auto_complete_2.value = "carpool_ending_address";
    }
};

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

function fillInAddressFieldsAddress1(address) {
    address_text_field.value = address.street_address;
    postal_code_text_field.value = address.postal_code;
    locality_text_field.value = address.locality;
    country_text_field.value = address.country;
}
function fillInAddressFieldsAddress2(address) {
    address_2_text_field.value = address.street_address;
    postal_2_code_text_field.value = address.postal_code;
    locality_2_text_field.value = address.locality;
    country_2_text_field.value = address.country;
}

function calculateAddress(auto_complete_text_field) {
    const place = auto_complete_text_field.getPlace();
    let street_address = "";
    let postalcode = "";
    let country = "";
    let locality = "";

    for (const component of place.address_components) {
        console.log(component.long_name + ' ' + component.types[0]);
        switch (component.types[0]) {
            case "street_number": {
                street_address = `${component.long_name} `;
                break;
            }
            case "route": {
                street_address += component.long_name;
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
    const address = `${street_address}, ${locality}, ${country}, ${postalcode}`;

    list_of_addresses.push(address);

    if (list_of_addresses.length > 1) {
      placeRouteBetweenTwoMarkers();
    } 
    createMapMarker(address);

    return address_obj = {
        street_address: street_address,
        locality: locality,
        country: country,
        postal_code: postalcode,
    };
}

window.initMap = initMap;