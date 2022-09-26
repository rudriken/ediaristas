import React from "react";
import {
    TituloPaginaContainer,
    TituloPaginaEstilizado,
    SubtituloPaginaEstilizado,
} from "./TituloPagina.style";

interface TituloPaginaProps {
    título: string;
    subtítulo?: string | JSX.Element;
}

const TituloPagina: React.FC<TituloPaginaProps> = ({ título, subtítulo }) => {
    return (
        <TituloPaginaContainer>
            <TituloPaginaEstilizado>{título}</TituloPaginaEstilizado>
            {subtítulo && <SubtituloPaginaEstilizado>{subtítulo}</SubtituloPaginaEstilizado>}
        </TituloPaginaContainer>
    );
};

export default TituloPagina;
