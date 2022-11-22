const image_container = document.querySelector("#image_output_from_upload");
const image_upload_input = document.querySelector("#avatar");
const reader = new FileReader();

image_upload_input.addEventListener("change", (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    image_container.src = image;
});

// var loadFile = function(event) {
// 	var image = document.getElementById('output');
// 	image.src = URL.createObjectURL(event.target.files[0]);
// };
// function readFileUrl(input) {
//     if (input.files && input.files[0]) {
//       const reader = new FileReader();
  
//       reader.onload = function (e) {
//         $('#blah').attr('src', e.target.result).width(150).height(200);
//       };
  
//       reader.readAsDataURL(input.files[0]);
//     }
//   }