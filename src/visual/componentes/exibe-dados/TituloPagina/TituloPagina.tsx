import React from "react";
import {
    TituloPaginaContainer,
    TituloPaginaEstilizado,
    SubtituloPaginaEstilizado,
} from "./TituloPagina.style";

interface TituloPaginaProps {
    titulo: string;
    subtitulo?: string | JSX.Element;
}

const TituloPagina: React.FC<TituloPaginaProps> = ({ titulo, subtitulo }) => {
    return (
        <TituloPaginaContainer>
            <TituloPaginaEstilizado>{titulo}</TituloPaginaEstilizado>
            {subtitulo && <SubtituloPaginaEstilizado>{subtitulo}</SubtituloPaginaEstilizado>}
        </TituloPaginaContainer>
    );
};

export default TituloPagina;
