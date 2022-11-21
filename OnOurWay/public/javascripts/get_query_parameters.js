const query_string = window.location.search;
const urlParams = new URLSearchParams(query_string);
const carpool_id = urlParams.get('id');
const carpool_id_element = document.querySelector("#carpool_id_input");
carpool_id_element.value = carpool_id;