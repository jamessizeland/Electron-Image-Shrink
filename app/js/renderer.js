// Initialize required packages
const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron"); //https://www.electronjs.org/docs/api/ipc-renderer

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

  // create image:minimize event and send to main.js
  ipcRenderer.send("image:minimize", {
    imgPath,
    quality,
  });
});
