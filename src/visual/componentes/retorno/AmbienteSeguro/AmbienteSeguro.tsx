import { Container } from "@mui/material";
import { AmbienteSeguroContainer } from "./AmbienteSeguro.style";

const AmbienteSeguro = () => {
    return (
        <AmbienteSeguroContainer>
            <Container>
                Ambiente 100% Seguro <i className={"twf-lock"} />
            </Container>
        </AmbienteSeguroContainer>
    );
};

export default AmbienteSeguro;
