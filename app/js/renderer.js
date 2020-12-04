// Initialize required packages
const path = require("path");
const os = require("os");

const ui = {
  form: document.getElementById("image-form"),
  slider: document.getElementById("slider"),
  img: document.getElementById("img"),
};

document.getElementById("output-path").innerText = path.join(
  os.homedir(),
  "imageshrink"
);

// Onsubmit
ui.form.addEventListener("submit", (e) => {
  e.preventDefault(); //stop the form's normal behaviour
  // using electron and node, we have access to a files property
  const imgPath = ui.img.files[0].path;
  const quality = ui.slider.value;
  console.log(imgPath, quality);
});
