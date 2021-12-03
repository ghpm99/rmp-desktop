import Pusher from 'pusher-js'

Pusher.logToConsole = true

const pusher = new Pusher(window.Main.webTokenKey(), {
  cluster: 'us2',
})

export const channel = pusher.subscribe('rmp')