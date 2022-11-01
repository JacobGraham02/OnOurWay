class Vehicle {

    make_array = new Array("Acura", "Alfa Romeo", "AM General", "American Motors", "Aston Martin", "Asuna", "Audi", "Austin", "Austin Healey", 
    "Avanti", "Bentley", "Bertone", "BMW", "Bugatti", "Buick", "Cadillac", "Checker", "Chevrolet", "Chrysler", "Citroen", "Daewoo", "Daihatsu", "DeLorean",
    "Dodge", "Eagle", "Edsel", "Fargo", "Ferrari", "Fiat", "Ford", "Freightliner", "Genesis", "Geo", "GMC", "Honda", "Hummer", "Hyundai", "Infiniti", "International", 
    "Isuzu", "Jaguar", "Jeep", "Jensen", "Karma", "Kia", "Lada", "Laforza", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati",
    "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "Merkur", "MG", "Mini", "Mitsubishi", "Mobility Ventures", "Nissan", "Oldsmobile", "Opel", "Peugeot",
    "Plymouth", "Polestar", "Pontiac", "Porsche", "Ram", "Renault", "Rivian", "Rolls Royce", "Rolls-Royce", "Rover", "Saab", "Saturn", "Scion", "Shelby", "Smart",
    "Spyker", "SRT", "Sterling", "Subaru", "Sunbeam", "Suzuki", "Tesla", "Toyopet", "Toyota", "Triumph", "Utilimaster", "Volkswagen", "Volvo", "Workhorse", "Yugo");
    minimum_car_year = 1950;
    maximum_car_year = 2024;
    minimum_license_plate_characters = 2;
    maximum_license_plate_characters = 8;
    /**
     * 
     * 
     * @param {int} id 
     * @param {string} make 
     * @param {string} model 
     * @param {int} year 
     * @param {string} colour 
     * @param {license_plate} license_plate
     */
    constructor(id, make, model, year, colour, license_plate) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.colour = colour;
        this.license_plate = license_plate;
    }

    /**
     * @param {int} id an integer greater than 0
     */
    set id(id) {
        if (id > 0) {
            this.id = id;
        }
    }

    /**
     * Will set a make for the vehicle if the length of the make is greater than 1
     * @param {string} make 
     */
    set make(make) {
        if (this.make_array.includes(make)) {
            this.make = make;
        }
    }

    /**
     * @param {int} year between 1950 and 2024
     */
    set year(year) {
        if (year >= this.minimum_car_year && year <= this.maximum_car_year) {
            this.year = year;
        }
    }

    /**
     * @param {string} model larger than 0 characters
     */
    set model(model) {
        if (model.length() > 0) {
            this.model = model;
        }
    }

    /**
     * @param {license_plate} string between 2 and 8 characters in length
     */
    set license_plate(license_plate) {
        license_plate_length = license_plate.length();
        if (license_plate_length >= this.minimum_license_plate_characters && license_plate_length <= this.maximum_license_plate_characters) {
            this.license_plate = license_plate;
        }
    }

    /**
     * @param {string} colour with a length greater than 0
     */
    set colour(colour) {
        if (colour.length() > 0) {
            this.colour = colour;
        }
    }
}