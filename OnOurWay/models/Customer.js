var regex_string_validations = require('../modules/RegexStringValidator.js');

class Customer {

    constructor(first, last, card_number, card_cvc, card_start, card_end, phone, email, photo_id) {
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

    /**
     * @param {string} first
     */
    set firstName(first) {
        if (regex_string_validations.validateFirstName(first)) {
            this.first_name = first;
        }
    }
    set lastName(last) {
        if (regex_string_validations.validateLastName(last)) {
            this.last_name = last;
        }
    }
    set emailAddress(email) {
        if (regex_string_validations.validateEmail(email)) {
            this.email_address = email;
        }
    }
    set phoneNumber(phone) {
        if (regex_string_validations.validatePhoneNumber(phone)) {
            this.phone_number = phone;
        }
    }
}