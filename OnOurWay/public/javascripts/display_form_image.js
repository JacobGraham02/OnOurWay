const image_container = document.querySelector("#image_output_from_upload");
const image_upload_input = document.querySelector("#avatar");
const reader = new FileReader();

image_upload_input.addEventListener("change", (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    image_container.src = image;
});
