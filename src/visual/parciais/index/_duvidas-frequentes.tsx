import { useState } from "react";
import { AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import {
    SecaoContainer,
    OndaEstilizada,
    SecaoTitulo,
    SecaoSubtitulo,
    AcordeonEstilizado,
} from "./_duvidas-frequentes.styled";

const duvidasLista = [
    {
        pergunta: "Dúvida 1",
        resposta:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum.",
    },
    {
        pergunta: "Dúvida 2",
        resposta:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum.",
    },
    {
        pergunta: "Dúvida 3",
        resposta:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum.",
    },
    {
        pergunta: "Dúvida 4",
        resposta:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae illum quibusdam voluptatibus sequi. Consequatur iste quas itaque ab eligendi nam ex minus quod veniam dolores, accusamus atque enim rerum.",
    },
];

const DuvidasFrequentes = () => {
    const [acordeonAtivo, alterarAcordeonAtivo] = useState(0);

    function verificarAbertura(númeroDoAcordeon: number): boolean {
        return acordeonAtivo === númeroDoAcordeon;
    }

    function mudarAcordeonAtivo(númeroDoAcordeon: number): void {
        if (verificarAbertura(númeroDoAcordeon)) {
            alterarAcordeonAtivo(0);
        } else {
            alterarAcordeonAtivo(númeroDoAcordeon);
        }
    }

    function pegarÍcone(númeroDoAcordeon: number): string {
        return verificarAbertura(númeroDoAcordeon) ? "twf-minus" : "twf-plus";
    }

    return (
        <SecaoContainer>
            <OndaEstilizada src={"/imagens/home/waves.svg"} />
            <Container>
                <SecaoTitulo>Ainda está com dúvidas?</SecaoTitulo>
                <SecaoSubtitulo>Veja abaixo as perguntas frequentes</SecaoSubtitulo>
                {duvidasLista.map((item, índice) => (
                    <AcordeonEstilizado
                        key={índice}
                        expanded={verificarAbertura(índice + 1)}
                        onChange={() => mudarAcordeonAtivo(índice + 1)}
                    >
                        <AccordionSummary
                            expandIcon={<i className={pegarÍcone(índice + 1)} />}
                        >
                            <Typography color={"primary"}>{item.pergunta}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>{item.resposta}</AccordionDetails>
                    </AcordeonEstilizado>
                ))}
            </Container>
        </SecaoContainer>
    );
};

export default DuvidasFrequentes;
