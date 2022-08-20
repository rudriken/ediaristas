import { styled, Container } from "@mui/material";
import Elo, { EloProps } from "visual/componentes/navegacao/Link/Link";
import { BotaoArredondadoEstilizado } from "visual/componentes/entradas/BotaoArredondado/BotaoArredondado.style";

export const SecaoContainer = styled("section")`
    position: relative;
    min-height: 250px;
    background-image: url("/imagens/home/living-room.svg");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;

    ${({ theme }) => theme.breakpoints.down("md")} {
        display: flex;
        text-align: center;
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
        background-position: center;
    }
`;

export const ContainerEstilizado = styled(Container)`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: "titulo" "descricao" "botao";

    ${({ theme }) => theme.breakpoints.down("md")} {
        align-content: center;
        max-width: 350px;
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
        grid-template-columns: 450px minmax(200px, 450px);
        grid-template-rows: 125px 55px 60px;
        grid-template-areas:
            "titulo 	imagem"
            "descricao 	imagem"
            "botao		imagem";
        gap: ${({ theme }) => theme.spacing(4)};
        align-items: center;
        align-content: center;
        justify-content: space-between;
        justify-items: center;
        min-height: 450px;
    }
`;

export const SecaoTitulo = styled("h1")`
    position: relative;
    grid-area: titulo;
    margin: 0;

    em {
        font-style: inherit;
    }

    .twf-search {
        position: absolute;
        top: 0;
        right: 0;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        border-radius: 50px;
        padding: ${({ theme }) => theme.spacing(2)};
        transform: translate(25%, -25%);
    }

    ${({ theme }) => theme.breakpoints.down("md")} {
        font-size: ${({ theme }) => theme.typography.body1.fontSize};
        font-weight: normal;

        .twf-search {
            display: none;
        }
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
        border: 4px solid ${({ theme }) => theme.palette.grey[200]};
        border-radius: 65px;
        padding: ${({ theme }) => theme.spacing(4) + " " + theme.spacing(8)};
        line-height: 30px;

        em {
            color: ${({ theme }) => theme.palette.primary.main};
        }
    }
`;

export const SecaoDescricao = styled("p")`
    grid-area: descricao;
    ${({ theme }) => theme.breakpoints.down("md")} {
        margin: 0 0 ${({ theme }) => theme.spacing(5)};
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
        width: 350px;
    }
`;

export const SecaoBotao = styled((propriedades: EloProps) => (
    <Elo {...propriedades} ComponenteReact={BotaoArredondadoEstilizado} />
))`
    grid-area: botao;
    ${({ theme }) => theme.breakpoints.up("md")} {
        width: 405px;
        height: 100%;
    }
`;

export const SecaoImagemContainer = styled("div")`
    position: relative;
    grid-area: imagem;

    img {
        position: relative;
        top: 35px;
        width: 100%;
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        border-radius: 100%;
    }

    &::before {
        top: 20%;
        right: -5%;
        width: 130px;
        height: 130px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        z-index: 2;
    }

    &::after {
        bottom: 0;
        right: 0;
        width: 40px;
        height: 40px;
        background-color: ${({ theme }) => theme.palette.grey[200]};
    }

    ${({ theme }) => theme.breakpoints.down("md")} {
        display: none;
    }
`;

export const BotaoDeBaixo = styled("span")`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 11px 12px;
    border-radius: 50px;
    color: ${({ theme }) => theme.palette.common.white};
    border: 5px solid currentColor; //"currentColor": a mesma cor da fonte

    i {
        position: relative;
        left: -2px;
    }
`;
