import { ipcMain } from 'electron'
import os from 'os'

export default function systemListeners() {
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
