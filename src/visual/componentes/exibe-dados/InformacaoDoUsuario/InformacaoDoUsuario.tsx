import React from "react";
import { SystemProps } from "@mui/system";
import {
    InformacaoDoUsuarioContainer,
    NomeUsuario,
    DescricaoUsuario,
    AvatarUsuario,
    AvaliacaoUsuario,
} from "./InformacaoDoUsuario.style";

export interface InformacaoDoUsuarioProps {
    nome: string;
    foto: string;
    avaliação: number;
    descrição?: string;
    avaliando?: boolean;
    sx?: SystemProps;
}

const InformacaoDoUsuario: React.FC<InformacaoDoUsuarioProps> = (propriedades) => {
    return (
        <InformacaoDoUsuarioContainer 
			sx={propriedades.sx} 
			avaliando={propriedades.avaliando}
		>
            <AvatarUsuario src={propriedades.foto}>{propriedades.nome[0]}</AvatarUsuario>
            <AvaliacaoUsuario value={propriedades.avaliação} readOnly />
            <NomeUsuario>{propriedades.nome}</NomeUsuario>
            <DescricaoUsuario>{propriedades.descrição}</DescricaoUsuario>
        </InformacaoDoUsuarioContainer>
    );
};

export default InformacaoDoUsuario;
