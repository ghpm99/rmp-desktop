import styled from 'styled-components'

interface ContainerProps {
  backgroundImage : string
}

export const Container = styled.div<ContainerProps>`
  background: url(${props => props.backgroundImage});
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
