const { app, BrowserWindow } = require("electron");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/Icon_256x256.png`,
  });
  //   mainWindow.loadURL("https://devdocs.io");
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);
