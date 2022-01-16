import { app, BrowserWindow } from 'electron'
import Store from 'electron-store'
import fetch, { RequestInit } from 'node-fetch'
import { store } from '../src/store'
import localListeners from './Listeners/Local'
import storeListeners from './Listeners/Store/index'
import systemListeners from './Listeners/System'


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
    fullscreen: store.get('fullscreen') as boolean,
    autoHideMenuBar: store.get('autoHideMenuBar') as boolean,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('close', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  systemListeners()

  storeListeners()

  localListeners()

  notifyReady()
}

async function notifyReady() {

  const init: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ "event": "Iniciou" })
  }

  fetch('http://localhost:8000/socket/event/', init).then(res => {
    if(res.status === 201){
      console.log(res.statusText)
    }
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

Store.initRenderer()

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

require('update-electron-app')()