const { app, BrowserWindow } = require('electron')

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    win.setIcon(__dirname + '/icon/icon.png')
    win.setResizable(false)
    win.loadFile('src/index.html')
}

app.whenReady().then(createWindow)
