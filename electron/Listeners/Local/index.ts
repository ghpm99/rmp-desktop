import { ipcMain } from 'electron'
import fs from 'fs'
import { store } from '../../../src/store/index'

export default function localListeners() {
  ipcMain.on('imagensFundo', event => {
    const caminhoFundos = store.get('caminhoFundos') as string
    const files = fs.readdirSync(caminhoFundos)
    event.returnValue = files
  })

  ipcMain.on('filesMedia', event => {
      const caminhoMedias = store.get('caminhoMedias') as string
      const files = fs.readdirSync(caminhoMedias)
      event.returnValue = files
  })
}
