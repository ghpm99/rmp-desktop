import { useState } from "react";
import Clock from "../../components/Clock";
import HardwareStatus from "../../components/HardwareStatus";
import { Container, ContainerClock, ContainerStatus } from "./styles";

export default function Idle() {
    const [state, setState] = useState({
        cpu: 0,
        ram: 0,
        currentTime: "00:00:00"
    });

    return (
        <Container>
            <ContainerStatus>
                <HardwareStatus
                    name={'CPU'}
                    value={0}
                    percentage={0.4}
                />
            </ContainerStatus>
            <ContainerStatus>
                <HardwareStatus
                    name={'RAM'}
                    value={0}
                    percentage={0.5}
                />
            </ContainerStatus>
            <ContainerClock>
                <Clock currentTime="23:02:54" />
            </ContainerClock>
        </Container>
    )
}
