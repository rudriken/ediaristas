import { styled, Avatar, Rating, Box, Theme } from "@mui/material";
// import { InformacaoDoUsuarioProps } from "./InformacaoDoUsuario";

export const InformacaoDoUsuarioContainer = styled(Box, {
    shouldForwardProp: (propriedade) => propriedade !== "avaliando",
})<{ avaliando?: boolean }>`
    display: grid;
    gap: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(2)};
    // espaçamento de 4px entre as linhas e 16px entre as colunas
    align-items: center;
    background-color: ${({ theme, avaliando }) => theme.palette.grey[avaliando ? 100 : 50]};
    ${({ theme, avaliando }) => tratarGrid(theme, avaliando)};
`;

function tratarGrid(tema: Theme, avaliando?: boolean): string {
    if (avaliando) {
        return `
			grid-template-columns: 45px 1fr auto;
			grid-template-rows: repeat(2, auto);
			grid-template-areas:
			"avatar 	nome 		avaliação"
			"avatar 	descrição 	avaliação";
			padding: ${tema.spacing(2) + " " + tema.spacing(4)};
		`;
    }
    return `
		grid-template-columns: 60px 1fr;
		grid-template-rows: repeat(3, auto);
		grid-template-areas:
		"avatar 	nome"
		"avatar 	avaliação"
		"avatar 	descrição";
		padding: ${tema.spacing(3)};
	`;
}

export const NomeUsuario = styled("div")`
    grid-area: nome;
    font-weight: bolder;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const DescricaoUsuario = styled("div")`
    grid-area: descrição;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const AvatarUsuario = styled(Avatar)`
    grid-area: avatar;
    width: 100%;
    height: initial;
    aspect-ratio: 1; // a altura sempre terá o mesmo tamanho da largura
`;

export const AvaliacaoUsuario = styled(Rating)`
    grid-area: avaliação;

    &.MuiRating-root {
        font-size: 14px;
    }
`;
