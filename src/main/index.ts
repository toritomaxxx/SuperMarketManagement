import { app, shell, BrowserWindow } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";

import {
  registerIpc,
  loginIpc,
  getProductsIpc,
  createProductIpc,
  deleteProductIpc,
  updateProductIpc,
  createSaleIpc,
  getUsersIpc,
  getReportsIpc,
  createReportIpc,
  getSalesIpc,
  deleteUserIpc,
  updateUserIpc,
  createMedioPagosIpc,
  getMedioPagosIpc,
  deleteMedioPagoIpc,
  updateMedioPagoIpc,
  cargarMedioPagosIpc,
  buscarPorRangoDeFechaIpc,
  loginAdmIpc,
  findUserIpc,

} from "./IpcFunctions";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? {} : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  registerIpc();
  loginIpc();
  createProductIpc();
  getProductsIpc();
  deleteProductIpc();
  updateProductIpc();
  createSaleIpc();
  getUsersIpc();
  getReportsIpc();
  createReportIpc();
  getSalesIpc();
  deleteUserIpc();
  updateUserIpc();
  createMedioPagosIpc();
  getMedioPagosIpc();
  deleteMedioPagoIpc();
  updateMedioPagoIpc();
  cargarMedioPagosIpc();
  buscarPorRangoDeFechaIpc();
  loginAdmIpc();
  findUserIpc();
});
