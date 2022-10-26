import {getDateAsString as stringConverter} from '../modules/DateFormatter.js';

class Customer {

    constructor(first, last, card_number, card_cvc, card_start, card_end, phone, email, photo_id) {
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
}