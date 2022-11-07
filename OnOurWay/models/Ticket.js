var validateDate = require('../modules/DateFormatter.js');

class Ticket {

    constructor(id, effective_date, expiry_date, owner) {
        this.setId(id);
        this.setEffectiveDate(effective_date);
        this.setExpiryDate(expiry_date);
        this.setOwner(owner);
    }

    setId(id) {
        if(Number.isInteger(id)) {
            if(id.length > 1 && id.length <= 20) {
                this.id = id;
            }
        }
    }
    setEffectiveDate(effective_date) {
        if(validateDate(effective_date)) {
            this.effective_date = effective_date;
        }
    }
    setExpiryDate(expiryDate) {
        if(validateDate(expiryDate)) {
            this.expiry_date = expiry_date;
        }
    }
    setOwner(owner) {
        this.passenger = owner;
    }
}