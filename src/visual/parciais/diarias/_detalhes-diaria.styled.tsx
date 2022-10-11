import { styled, Paper, Typography } from "@mui/material";
// import {  } from "@mui/material";

export const CartoesContainer = styled("div")`
	display: grid;
	grid-template-columns: 1fr;
	margin-bottom: ${({ theme }) => theme.spacing(5)};
	gap: ${({ theme }) => theme.spacing(2)};

	${({ theme }) => theme.breakpoints.up("md")} {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			"detalhe 	detalhe"
			"diarista 	cliente";
		gap: ${({ theme }) => theme.spacing(7)};
	}
`;

export const TituloDoServico = styled(Typography)`
	color: ${({ theme }) => theme.palette.primary.main};
	font-weight: bold;
	margin-bottom: ${({ theme }) => theme.spacing(4)};

	${({ theme }) => theme.breakpoints.down("md")} {
		display: none;
	}
`;

export const DetalhesDoServico = styled(Paper)`
	color: ${({ theme }) => theme.palette.text.secondary};

	${({ theme }) => theme.breakpoints.up("md")} {
		grid-area: detalhe;
		padding: ${({ theme }) => theme.spacing(4)};
	}

	${({ theme }) => theme.breakpoints.down("md")} {
		box-shadow: none;
		margin-bottom: ${({ theme }) => theme.spacing(5)};
	}
`;

export const TituloDoUsuario = styled(Typography)`
	color: ${({ theme }) => theme.palette.primary.main};
	font-weight: bold;

	${({ theme }) => theme.breakpoints.down("md")} {
		background-color: ${({ theme }) => theme.palette.grey[100]};
		padding: ${({ theme }) => theme.spacing(3)};
		margin: ${({ theme }) => "0 " + theme.spacing(-3)};
	}
`;

export const CartaoDoUsuario = styled(Paper)`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing()};
	padding: ${({ theme }) => theme.spacing(4)};

	${({ theme }) => theme.breakpoints.down("md")} {
		padding: 0;
		box-shadow: none;
	}
`;
