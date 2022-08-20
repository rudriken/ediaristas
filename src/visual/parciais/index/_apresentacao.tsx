import { useState, useEffect } from "react";
import {
    SecaoContainer,
    ContainerEstilizado,
    SecaoTitulo,
    SecaoDescricao,
    SecaoBotao,
    SecaoImagemContainer,
    BotaoDeBaixo,
} from "./_apresentacao.styled";

const Apresentacao = () => {
    const [imagemFaxineiro, alterarImagemFaxineiro] = useState("");

    useEffect(() => {
        const caminho = "/imagens/home/";
        const novaImagemFaxineiro = Math.random() < 0.5 ? "housekeeper.png" : "janitor.png";
        alterarImagemFaxineiro(caminho + novaImagemFaxineiro);
    }, []);

    return (
        <SecaoContainer>
            <ContainerEstilizado>
                <SecaoTitulo>
                    Encontre agora mesmo um(a) <em>diarista</em>
                    <i className={"twf-search"} />
                </SecaoTitulo>
                <SecaoDescricao>
                    São mais de 5.000 profissionais esperando por você!
                </SecaoDescricao>
                <SecaoBotao mui={{ variant: "contained" }} href={"/encontrar-diarista"}>
                    Encontrar um(a) diarista
                </SecaoBotao>
                <SecaoImagemContainer>
                    <img src={imagemFaxineiro} alt={"logo"} />
                </SecaoImagemContainer>
            </ContainerEstilizado>
            <BotaoDeBaixo>
                <i className={"twf-caret-down"} />
            </BotaoDeBaixo>
        </SecaoContainer>
    );
};

export default Apresentacao;
