import { styled } from "@mui/material";
// import {  } from "@mui/material";
// import { MigalhaDePaoProps } from "./MigalhaDePao";

export const ContainerMigalhaDePao = styled("ul")`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	list-style: none;
	color: ${({ theme }) => theme.palette.text.secondary};
	counter-reset: migalhadepao-contador;

	${({ theme }) => theme.breakpoints.down("md")} {
		font-size: 12px;
		text-align: center;
		margin: 0;
		span {
			display: none;
		}
	}

	${({ theme }) => theme.breakpoints.up("md")} {
		gap: ${({ theme }) => theme.spacing(2)};
		margin: ${({ theme }) => theme.spacing(2) + " " + theme.spacing()};
	}
`;

export const ItemMigalhaDePao = styled("li", {
	shouldForwardProp: (propriedade) => propriedade !== "estáSelecionado",
})<{ estáSelecionado?: boolean }>`
	${({ theme }) => theme.breakpoints.down("sm")} {
		padding: ${({ theme }) => theme.spacing()};
	}

	${({ theme }) => theme.breakpoints.down("md")} {
		flex: auto;
		padding: ${({ theme }) => theme.spacing() + " " + theme.spacing(3)};
		background-color: ${({ theme, estáSelecionado }) =>
			theme.palette.grey[estáSelecionado ? 200 : 100]};
	}

	${({ theme }) => theme.breakpoints.up("md")} {
		counter-increment: migalhadepao-contador;
		font-weight: ${({ estáSelecionado }) =>
			estáSelecionado ? "bold" : "normal"};
		&::before {
			content: counter(migalhadepao-contador);
			margin-right: ${({ theme }) => theme.spacing()};
		}
	}
`;
