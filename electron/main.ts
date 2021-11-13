import { app, BrowserWindow, ipcMain } from 'electron'
import os from 'os'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1366,
    height: 768,
    minHeight: 768,
    backgroundColor: '#191622',
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  ipcMain.on('cpu', event => {
    let cpus = os.cpus()

    let cpu = cpus
      .map(cpu => cpu.times)
      .reduce((prev, next) => ({
        user: prev.user + next.user,
        nice: prev.nice + next.nice,
        sys: prev.sys + next.sys,
        idle: prev.idle + next.idle,
        irq: prev.irq + next.irq,
      }))

    let cpuUsage =
      100 -
      (cpu.idle / (cpu.irq + cpu.nice + cpu.sys + cpu.user + cpu.idle)) * 100

    event.returnValue = Math.round(cpuUsage)
  })

  ipcMain.on('ram', event => {
    let totalMemory: number = os.totalmem()
    let freeMemory: number = os.freemem()
    let usedMemory: number = totalMemory - freeMemory
    let percentageMemory: number = ~~((usedMemory / totalMemory) * 100)

    event.returnValue = percentageMemory
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

require('update-electron-app')({
  notifyUser: false
})
