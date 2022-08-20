import { List, Box, Typography } from "@mui/material";
import Elo from "visual/componentes/navegacao/Link/Link";
import {
    RodapeContainer,
    RodapeTitulo,
    RodapeListaItem,
    RodapeAplicativosERedesSociais,
    Aplicativos,
    RedesSociais,
    BotaoRedeSocial,
    RodapeSubContainer,
} from "./Footer.style";

const Rodape = () => {
    return (
        <RodapeContainer>
            <RodapeSubContainer>
                <div>
                    <RodapeTitulo>Menu</RodapeTitulo>
                    <List>
                        <RodapeListaItem>
                            <Elo
                                href={"/encontrar-diarista"}
                                mui={{ color: "inherit", variant: "body2" }}
                            >
                                Encontrar um(a) diarista
                            </Elo>
                        </RodapeListaItem>
                        <RodapeListaItem>
                            <Elo
                                href={"/cadastro/diarista"}
                                mui={{ color: "inherit", variant: "body2" }}
                            >
                                Seja um(a) diarista
                            </Elo>
                        </RodapeListaItem>
                        <RodapeListaItem>
                            <Elo href={"/"} mui={{ color: "inherit", variant: "body2" }}>
                                Por que usar o E-Diaristas?
                            </Elo>
                        </RodapeListaItem>
                        <RodapeListaItem>
                            <Elo href={"/"} mui={{ color: "inherit", variant: "body2" }}>
                                Principais Dúvidas
                            </Elo>
                        </RodapeListaItem>
                    </List>
                </div>
                <Box sx={{ maxWidth: "400px" }}>
                    <RodapeTitulo>Quem somos</RodapeTitulo>
                    <Typography variant={"body2"}>
                        E-Diaristas te ajuda a encontrar um profissional perfeito para
                        realizar a limpeza da sua casa. Garantimos o(a) melhor profissional
                        com total segurança e praticidade! São milhares de clientes
                        satisfeitos por todo o país.
                    </Typography>
                </Box>
                <RodapeAplicativosERedesSociais>
                    <Box>
                        <RodapeTitulo>Baixe nossos aplicativos</RodapeTitulo>
                        <Aplicativos>
                            <li>
                                <a
                                    href={
                                        "https://apps.apple.com/br/app/treinaweb/id1322729447"
                                    }
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}
                                >
                                    <img
                                        src={"/imagens/logos/app-store.png"}
                                        alt={"AppStore"}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={
                                        "https://play.google.com/store/apps/details?id=br.com.treinaweb.mobile"
                                    }
                                    target={"_blank"}
                                    rel={"noopener noreferrer"}
                                >
                                    <img
                                        src={"/imagens/logos/google-play.png"}
                                        alt={"Google Play"}
                                    />
                                </a>
                            </li>
                        </Aplicativos>
                    </Box>
                    <div>
                        <RodapeTitulo>Redes Sociais</RodapeTitulo>
                        <RedesSociais>
                            <RodapeListaItem>
                                <BotaoRedeSocial href={"/"}>
                                    <i className={"twf-facebook-f"} />
                                </BotaoRedeSocial>
                            </RodapeListaItem>
                            <RodapeListaItem>
                                <BotaoRedeSocial href={"/"}>
                                    <i className={"twf-instagram"} />
                                </BotaoRedeSocial>
                            </RodapeListaItem>
                            <RodapeListaItem>
                                <BotaoRedeSocial href={"/"}>
                                    <i className={"twf-youtube"} />
                                </BotaoRedeSocial>
                            </RodapeListaItem>
                        </RedesSociais>
                    </div>
                </RodapeAplicativosERedesSociais>
            </RodapeSubContainer>
        </RodapeContainer>
    );
};

export default Rodape;
