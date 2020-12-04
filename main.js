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

// initialize window variables
let mainWindow, aboutWindow;

/********************************************/
// configure windows https://www.electronjs.org/docs/api/browser-window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: isDev ? 800 : 500,
    height: 600,
    icon: `${__dirname}/assets/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true, //enable node integration with our renderer
    },
  });
  if (isDev) {
    mainWindow.webContents.openDevTools(); //automatically show devtools if in dev mode
  }
  mainWindow.loadFile("./app/index.html");
}
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/Icon_256x256.png`,
    resizable: false,
    backgroundColor: "white",
  });
  aboutWindow.loadFile("./app/about.html");
}
/********************************************/

app.on("ready", () => {
  // create main application window
  createMainWindow();

  // create file menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // create global keyboard shortcuts https://www.electronjs.org/docs/api/accelerator
  /* NOTE disabled as we get this functionality from the developer menu roles instead
  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () =>
    mainWindow.toggleDevTools()
  );
  */

  // garbage collect when closed
  mainWindow.on("closed", () => (mainWindow = null));
});

// Menu Template https://www.electronjs.org/docs/api/menu
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
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
