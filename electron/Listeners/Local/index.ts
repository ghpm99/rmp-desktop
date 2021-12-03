import { ipcMain } from 'electron'
import fs from 'fs'
import { store } from '../../../src/store/index'

export default function localListeners() {
  ipcMain.on('imagensFundo', event => {
    let caminhoFundos = store.get('caminhoFundos') as string
    let files = fs.readdirSync(caminhoFundos)
    event.returnValue = files
  })

  ipcMain.on('filesMedia', event => {
      let caminhoMedias = store.get('caminhoMedias') as string
      let files = fs.readdirSync(caminhoMedias)
      event.returnValue = files
  })
}
