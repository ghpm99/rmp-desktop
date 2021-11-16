
import Idle from './pages/idle';
import { GlobalStyle } from './styles/GlobalStyle';

const pages : Array<Page> = [
  {name : 'idle', component : Idle}
]

const activePage = pages[0]

const caminhoMedias = window.Main.caminhoMedias()

export function App() {
  console.log("caminho Medias" ,caminhoMedias)
  return (
    <>
      <GlobalStyle />
      <activePage.component />
    </>
  )
}