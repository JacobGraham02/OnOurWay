var regex_string_validations = require('../modules/RegexStringValidator.js');

class Carpool {

    min_passengers = 0;
    max_passengers = 20;
    street_address_length = 20;
    /**
     * 
     * @param {int} id 
     * @param {string} address 
     * @param {Passenger[]} passengers 
     * @param {int} maximum_passengers
     * @param {Driver} driver 
     */
    constructor(id, address, passengers, maximum_passengers, driver) {
        this.id = id;
        this.address = address;
        this.passengers = passengers;
        this.maximum_passengers = maximum_passengers;
        this.driver = driver;
    }

    /**
     * Will only set a carpool id if the id is greater than 0
     * @param {int} id
     */
    set id(id) {
        if (id > 0) {
            this.id = id;
        }
    }
    /**
     * Will only set the street address for carpool location if the address is longer than 20 characters
     * @param {string} address
     */
    set address(address) {
        if (address.length() >= street_address_length) {
            this.address = address;
        }
    }

    /**
     * Will only set passengers of a carpool when there is at least one passenger
     * @param {Passenger[]} passengers
     */
    set passengers(passengers) {
        if (passengers.length >= 0) {
            this.passengers = passengers;
        }
    }

    /**
     * Will only set a maximum number of passengers for carpool when it is between 0 and 20
     * @param {integer} max_passengers
     */
    set maximum_passengers(max_passengers) {
        if (max_passengers >= min_passengers && max_passengers <= max_passengers) {
            this.maximum_passengers = max_passengers;
        }
    }

    /**
     * Will only set a carpool driver if the Driver object has an id greater than 0
     * @param {Driver} driver
     */
    set driver(driver) {
        if (driver.id > 0) {
            this.driver = driver;
        }
    }
}