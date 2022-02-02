import { ipcMain } from 'electron'
import os from 'os'

export default function systemListeners() {
  ipcMain.on('cpu', event => {
    const cpus = os.cpus()

    const cpu = cpus
      .map(cpu => cpu.times)
      .reduce((prev, next) => ({
        user: prev.user + next.user,
        nice: prev.nice + next.nice,
        sys: prev.sys + next.sys,
        idle: prev.idle + next.idle,
        irq: prev.irq + next.irq,
      }))

    const cpuUsage =
      100 -
      (cpu.idle / (cpu.irq + cpu.nice + cpu.sys + cpu.user + cpu.idle)) * 100

    event.returnValue = Math.round(cpuUsage)
  })

  ipcMain.on('ram', event => {
    const totalMemory: number = os.totalmem()
    const freeMemory: number = os.freemem()
    const usedMemory: number = totalMemory - freeMemory
    const percentageMemory: number = ~~((usedMemory / totalMemory) * 100)

    event.returnValue = percentageMemory
  })
}
