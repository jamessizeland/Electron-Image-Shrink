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
    backgroundColor: "white",
  });
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  // create main application window
  createMainWindow();

  // create file menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // create global keyboard shortcuts https://www.electronjs.org/docs/api/accelerator
  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () =>
    mainWindow.toggleDevTools()
  );

  // garbage collect when closed
  mainWindow.on("closed", () => (mainWindow = null));
});

// Menu Template https://www.electronjs.org/docs/api/menu
const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
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
