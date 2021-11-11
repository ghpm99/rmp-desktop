import { GlobalStyle } from './styles/GlobalStyle'
import { setPusherClient } from 'react-pusher'
import Pusher from 'pusher-js'
import Idle from './pages/idle';

const pusherClient = new Pusher('d3b547054b245718cdcd', {
  cluster: 'us2'
});

setPusherClient(pusherClient)

const pages : Array<Page> = [
  {name : 'idle', component : Idle}
]

const activePage = pages[0]

export function App() {
  return (
    <>
      <GlobalStyle />
      <activePage.component />
    </>
  )
}