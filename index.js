const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

//janela principal
const createWindow = () => {
  const win = new BrowserWindow({
    width: 450,
    height: 550,
    resizable: false,
    autoHideMenuBar: true,
    icon: 'src/assets/icon.png',
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  })

  win.loadFile('src/views/index.html')
}

//janela de configurações
ipcMain.on('open-settings-window', () => {
  const settingsWin = new BrowserWindow({
    width: 400,
    height: 350,
    resizable: false,
    autoHideMenuBar: true,
    icon: 'src/assets/icon.png',
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  settingsWin.loadFile('src/views/settings.html');
});

//rodando o programa
app.whenReady().then(() => {
  createWindow()
})