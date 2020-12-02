/********************************************
Setup
********************************************/
// initialize required packages
const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

// set environment
process.env.NODE_ENV = "development"; //shows our environment, we can set this explicitly
const isDev = process.env.NODE_ENV !== "production";
console.log(process.platform);
const isMac = process.platform === "darwin";

let mainWindow;

function createMainWindow() {
  // https://www.electronjs.org/docs/api/browser-window
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/Icon_256x256.png`,
    resizable: isDev,
  });
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  mainWindow.on("closed", () => (mainWindow = null)); //garbage collect when closed
});

//Menu Template
const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+W", //global cross-platform quit shortcut
        click: () => app.quit(),
      },
    ],
  },
];

/********************************************/
//Platform specific behaviour
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
/********************************************/
