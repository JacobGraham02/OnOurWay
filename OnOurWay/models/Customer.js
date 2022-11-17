var regex_string_validations = require('../modules/RegexStringValidator.js');

class Customer {

    constructor(id, first, last, username, password, salt, card_number, card_cvc, card_start, card_end, phone, email, photo_id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
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

    set username(user_name) {
        this.username = user_name;
    }

    set password(pass_word) {
        this.password = pass_word;
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