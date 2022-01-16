import { useEffect, useState } from "react";
import Clock from "../../components/Clock";
import HardwareStatus from "../../components/HardwareStatus";
import { Container, ContainerClock, ContainerStatus } from "./styles";
import background1 from '../../assets/images/idle-background.gif'

export default function Idle() {

    const fundos: string[] = window.Main.imagensFundo()

    const [state, setState] = useState({
        cpu: 0,
        ram: 0,
        currentTime: "00:00:00"
    });

    const [background, setBackground] = useState(
        background1
    )

    useEffect(() => {
        const interval = setInterval(() => setState({
            ...state,
            cpu: window.Main.cpuUsage(),
            ram: window.Main.ramUsage(),
            currentTime: getCurrentTime(),
        }), 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setBackground(window.Main.caminhoFundos() + "/" + fundos[~~(Math.random() * fundos.length)])
        }, 1000 * 60 * 60)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Container backgroundImage={background}>
            <ContainerStatus>
                <HardwareStatus
                    name={'CPU'}
                    value={state.cpu}
                    percentage={state.cpu}
                />
            </ContainerStatus>
            <ContainerStatus>
                <HardwareStatus
                    name={'RAM'}
                    value={state.ram}
                    percentage={state.ram}
                />
            </ContainerStatus>
            <ContainerClock>
                <Clock currentTime={state.currentTime} />
            </ContainerClock>
        </Container>
    )
}

function getCurrentTime() {
    const date = new Date()
    const hour = date.getHours().toLocaleString('pt-br', { minimumIntegerDigits: 2, useGrouping: false })
    const minute = date.getMinutes().toLocaleString('pt-br', { minimumIntegerDigits: 2, useGrouping: false })
    const seconds = date.getSeconds().toLocaleString('pt-br', { minimumIntegerDigits: 2, useGrouping: false })
    const newCurrentTime = hour + ":" + minute + ":" + seconds
    return newCurrentTime
}