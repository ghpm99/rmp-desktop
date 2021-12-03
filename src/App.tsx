

import Idle from './pages/idle';
import { channel } from './services/socket';
import { GlobalStyle } from './styles/GlobalStyle';

export function App() {

  const pages: Array<Page> = [
    { name: 'idle', component: Idle }
  ]
  const activePage = pages[0]

  channel.bind('mediafilesrequest', (data: any) => {
    channel.emit('mediafilesresponse', window.Main.filesMedia())
  })

  return (
    <>
      <GlobalStyle />
      <activePage.component />
    </>
  )
}