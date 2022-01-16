

import { Page } from './@types/page';
import Idle from './pages/idle';
import Media from './pages/media';
import { channel } from './services/socket';
import { GlobalStyle } from './styles/GlobalStyle';

export function App() {

  const pages: Array<Page> = [
    { name: 'idle', component: Idle },
    { name: 'media', component: Media}
  ]
  const activePage = pages[0]

  channel.bind('mediafilesrequest', (data: any) => {
    channel.emit('mediafilesresponse', window.Main.filesMedia())
  })

  channel.bind('changePage', (data: any) => {
    console.log(data)
  })

  return (
    <>
      <GlobalStyle />
      <activePage.component />
    </>
  )
}