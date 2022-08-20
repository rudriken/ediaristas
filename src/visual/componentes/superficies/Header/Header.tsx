import { useState } from "react";
import { Container, Toolbar, IconButton, MenuList, MenuItem, Divider } from "@mui/material";
import useMóvelAtivo from "lógica/ganchos/useMóvelAtivo";
import { BotaoArredondadoEstilizado } from "visual/componentes/entradas/BotaoArredondado/BotaoArredondado.style";
import Elo from "visual/componentes/navegacao/Link/Link";
import {
    CabecalhoAppBar,
    CabecalhoLogo,
    CabecalhoBotoesContainer,
    CabecalhoGaveta,
} from "./Header.style";

const Cabecalho = () => {
    const móvelAtivo = useMóvelAtivo();
    return móvelAtivo ? <CabecalhoVersãoMóvel /> : <CabecalhoVersãoDesktop />;
};

const CabecalhoVersãoDesktop = () => (
    <CabecalhoAppBar>
        <Toolbar component={Container}>
            <Elo href={"/"}>
                <CabecalhoLogo src={"/imagens/logos/logo.svg"} alt={"e-diaristas"} />
            </Elo>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <CabecalhoBotoesContainer>
                <Elo
                    href={"/cadastro/diarista"}
                    ComponenteReact={BotaoArredondadoEstilizado}
                    mui={{ color: "primary", variant: "contained" }}
                >
                    Seja um(a) diarista
                </Elo>
                <Elo href={"/login"} ComponenteReact={BotaoArredondadoEstilizado}>
                    Login
                </Elo>
            </CabecalhoBotoesContainer>
        </Toolbar>
    </CabecalhoAppBar>
);

const CabecalhoVersãoMóvel = () => {
    const [gavetaAberta, alterarGavetaAberta] = useState(false);
    return (
        <CabecalhoAppBar>
            <Toolbar component={Container}>
                <IconButton
                    edge={"start"}
                    color="inherit"
                    onClick={() => alterarGavetaAberta(true)}
                >
                    <i className={"twf-bars"} />
                </IconButton>
                <Elo href={"/"}>
                    <CabecalhoLogo src={"/imagens/logos/logo.svg"} alt={"e-diaristas"} />
                </Elo>
                <CabecalhoGaveta
                    open={gavetaAberta}
                    onClose={() => alterarGavetaAberta(false)}
                    onClick={() => alterarGavetaAberta(false)}
                >
                    <MenuList>
                        <Elo href={"/login"} ComponenteReact={MenuItem}>
                            Login
                        </Elo>
                        <Divider />
                        <Elo href={"/cadastro/diarista"} ComponenteReact={MenuItem}>
                            Seja um(a) diarista
                        </Elo>
                    </MenuList>
                </CabecalhoGaveta>
            </Toolbar>
        </CabecalhoAppBar>
    );
};

export default Cabecalho;
