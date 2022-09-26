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

    function verificarAbertura(numeroDoAcordeon: number): boolean {
        return acordeonAtivo === numeroDoAcordeon;
    }

    function mudarAcordeonAtivo(numeroDoAcordeon: number): void {
        if (verificarAbertura(numeroDoAcordeon)) {
            alterarAcordeonAtivo(0);
        } else {
            alterarAcordeonAtivo(numeroDoAcordeon);
        }
    }

    function pegarÍcone(numeroDoAcordeon: number): string {
        return verificarAbertura(numeroDoAcordeon) ? "twf-minus" : "twf-plus";
    }

    return (
        <SecaoContainer>
            <OndaEstilizada src={"/imagens/home/waves.svg"} />
            <Container>
                <SecaoTitulo>Ainda está com dúvidas?</SecaoTitulo>
                <SecaoSubtitulo>Veja abaixo as perguntas frequentes</SecaoSubtitulo>
                {duvidasLista.map((item, indice) => (
                    <AcordeonEstilizado
                        key={indice}
                        expanded={verificarAbertura(indice + 1)}
                        onChange={() => mudarAcordeonAtivo(indice + 1)}
                    >
                        <AccordionSummary
                            expandIcon={<i className={pegarÍcone(indice + 1)} />}
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
