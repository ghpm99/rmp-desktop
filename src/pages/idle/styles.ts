import styled from 'styled-components'
import backgroundGif from 'D:/Projetos/rmp-desktop/src/assets/images/idle-background.gif'

export const Container = styled.div`
  background: url(${backgroundGif});
  background-size: cover;
  height: 100vh;
`
export const ContainerStatus = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ContainerClock = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 5vh;
  font-size: 58px;
`
