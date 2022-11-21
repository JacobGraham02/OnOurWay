const query_string = window.location.search;
const urlParams = new URLSearchParams(query_string);
const carpool_id = urlParams.get('id');
console.log(carpool_id);