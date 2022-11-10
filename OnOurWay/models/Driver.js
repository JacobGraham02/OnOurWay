class Driver {
    constructor(drivers_license_number, drivers_license_effective_date, drivers_license_expiry_date,
        insurance_policy_number, insurance_effective_date, insurance_expiry_date,
        vehicles, join_date, total_drivers, total_distance_driven, rating) {
        this.setDriversLicenseNumber(drivers_license_number);
        this.setDriversLicenseEffectiveDate(drivers_license_effective_date);
        this.setDriversLicenseExpiryDate(drivers_license_expiry_date);
        this.setInsurancePolicyNumber(insurance_policy_number);
        this.setInsuranceEffectiveDate(insurance_effective_date);
        this.setInsuranceExpiryDate(insurance_expiry_date);
        this.setVehicles(vehicles);
        this.setJoinDate(join_date);
        this.setTotalDrivers(total_drivers);
        this.setTotalDistanceDriven(total_distance_driven);
        this.setRating(rating);
    }
    setDriversLicenseNumber(drivers_license_number) {
        this.drivers_license_number = drivers_license_number;
    }
    setDriversLicenseEffectiveDate(drivers_license_effective_date) {
        this.drivers_license_effective_date = drivers_license_effective_date;
    }
    setDriversLicenseExpiryDate(drivers_license_expiry_date) {
        this.drivers_license_expiry_date = drivers_license_expiry_date;
    }
    setInsurancePolicyNumber(insurance_policy_number) {
        this.insurance_policy_number = insurance_policy_number;
    }
    setInsuranceEffectiveDate(insurance_effective_date) {
        this.insurance_effective_date = insurance_effective_date;
    }
    setInsuranceExpiryDate(insurance_expiry_date){
        this.insurance_expiry_date = insurance_expiry_date;
    }
    setVehicles(vehicles){
        this.vehicels = vehicles;
    }
    setJoinDate(join_date) {
        this.join_date = join_date;
    }
    setTotalDrivers(total_drivers) {
        this.total_drivers = total_drivers;
    }
    setTotalDistanceDriven(total_distance_driven) {
        this.total_distance_driven = total_distance_driven;
    }
    setRating(rating) {
        this.rating = rating;
    }
}