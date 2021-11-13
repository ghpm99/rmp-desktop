import { useEffect, useState } from "react";
import Clock from "../../components/Clock";
import HardwareStatus from "../../components/HardwareStatus";
import { Container, ContainerClock, ContainerStatus } from "./styles";

export default function Idle() {

    const [state, setState] = useState({
        cpu: 0,
        ram: 0,
        currentTime: "00:00:00"
    });

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

    return (
        <Container>
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