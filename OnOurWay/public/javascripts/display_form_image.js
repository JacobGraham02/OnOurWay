const image_container = document.querySelector("#image_output_from_upload");
const image_upload_input = document.querySelector("#avatar");
const register_dropdown_menu = document.querySelector("#user_type_select");
const insurance_policy_number_field = document.querySelector("#insurance_policy_number");
const insurance_effective_date_field = document.querySelector("#insurance_effective_date");
const insurance_expiry_date_field = document.querySelector("#insurance_expiry_date");
const insurance_policy_number_label = document.querySelector("#insurance_policy_number_label");
const insurance_effective_date_label = document.querySelector("#insurance_effective_date_label");
const insurance_expiry_date_label = document.querySelector("#insurance_expiry_date_label");

makeInputFieldsInvisible();
const reader = new FileReader();

image_upload_input.addEventListener("change", (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    image_container.src = image;
});

function makeInputFieldsVisible() {
    insurance_expiry_date_label.style.visibility = "visible";
    insurance_effective_date_label.style.visibility = "visible";
    insurance_policy_number_label.style.visibility = "visible";
    insurance_policy_number_field.style.visibility = "visible";
    insurance_effective_date_field.style.visibility = "visible";
    insurance_expiry_date_field.style.visibility = "visible";
}

function makeInputFieldsInvisible() {
    insurance_expiry_date_label.style.visibility = "hidden";
    insurance_effective_date_label.style.visibility = "hidden";
    insurance_policy_number_label.style.visibility = "hidden";
    insurance_policy_number_field.style.visibility = "hidden";
    insurance_effective_date_field.style.visibility = "hidden";
    insurance_expiry_date_field.style.visibility = "hidden";
}

register_dropdown_menu.addEventListener("change", (e) => {
    const dropdown_value = e.target.value;
    if (dropdown_value === "Driver") {
        makeInputFieldsVisible();
    } else {
        makeInputFieldsInvisible();
    }
});
