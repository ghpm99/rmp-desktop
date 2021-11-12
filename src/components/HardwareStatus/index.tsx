import { Container, ContainerStatus, Name, Percentage, Value } from './styles'

interface HardwareStatusProps {
    name: string,
    value: number,
    percentage?: number
}

export default function HardwareStatus(props: HardwareStatusProps) {

    return (
        <Container>
            <ContainerStatus>
                <Name>{props.name}</Name>
                <Value>{props.value}</Value>
            </ContainerStatus>
            {props.percentage &&
                <Percentage value={props.percentage} max={100} />
            }
        </Container>
    )
}