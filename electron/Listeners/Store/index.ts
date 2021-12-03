import { ipcMain } from 'electron'
import { store } from '../../../src/store/index'

export default function storeListeners() {
  ipcMain.on('caminhoMedias', event => {
    let caminhoMedias = store.get('caminhoMedias') as string
    event.returnValue = caminhoMedias
  })

  ipcMain.on('caminhoFundos', event => {
    let caminhoFundos = store.get('caminhoFundos') as string
    event.returnValue = caminhoFundos
  })

  ipcMain.on('webTokenKey', event => {
    event.returnValue = store.get('webTokenKey') as string
  })
}
