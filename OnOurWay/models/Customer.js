var regex_string_validations = require('../modules/RegexStringValidator.js');

class Customer {

    /**
     * For a customer class, photo id is a string because the database will only store the path to the image file. 
     * Setters are implicitly called when assigning constructor parameter variable values to object properties reference by 'this'. 
     * @param {int} id
     * @param {string} first 
     * @param {string} last 
     * @param {string} card_number 
     * @param {char} card_cvc 
     * @param {Date} card_start 
     * @param {Date} card_end 
     * @param {string} phone 
     * @param {string} email 
     * @param {string} photo_id 
     */
    constructor(id, first, last, card_number, card_cvc, card_start, card_end, phone, email, photo_id) {
        this.id = id;
        this.first_name = first;
        this.last_name = last;
        this.credit_card_number = card_number;
        this.credit_card_cvc = card_cvc;
        this.credit_card_effective_date = card_start;
        this.credit_card_expiry_date = card_end;
        this.phone_number = phone;
        this.email_address = email;
        this.photo_identification = photo_id;
    }

    set id(id) {
        if (id >= 0) {
            this.id = id;
        }
    }

    /**
     * @param {string} first
     */
    set first_name(first) {
        if (regex_string_validations.validateFirstName(first)) {
            this.first_name = first;
        }
    }

    /**
     * @param {string} last
     */
    set last_name(last) {
        if (regex_string_validations.validateLastName(last)) {
            this.last_name = last;
        }
    }

    /**
     * @param {string} email
     */
    set email_address(email) {
        if (regex_string_validations.validateEmail(email)) {
            this.email_address = email;
        }
    }

    /**
     * @param {string} phone
     */
    set phone_number(phone) {
        if (regex_string_validations.validatePhoneNumber(phone)) {
            this.phone_number = phone;
        }
    }
}