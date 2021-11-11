import { Container } from "./styles";

interface ClockProps {
    currentTime: string
}

export default function Clock(props: ClockProps) {
    return (
        <Container>
            {props.currentTime}
        </Container>
    )
}