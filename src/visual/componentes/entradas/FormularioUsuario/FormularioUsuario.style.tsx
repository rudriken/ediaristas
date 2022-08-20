import { styled } from "@mui/material";
// import {  } from "@mui/material";
// import { FormularioUsuarioProps } from "./FormularioUsuario";

export const GradeBase = styled("div")`
	display: grid;
	grid-auto-rows: auto;
	gap: ${({ theme }) => theme.spacing(2) + " " + theme.spacing(3)};
	padding: ${({ theme }) => "0 0 " + theme.spacing(5)};

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-columns: 1fr;
		gap: ${({ theme }) => theme.spacing(3)};
	}
`;

export const DadosNovoContato = styled(GradeBase)`
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"email 				email"
		"senha 				senha-força"
		"confirmar-senha 	senha-força";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas:
			"email"
			"senha"
			"senha-força"
			"confirmar-senha";
	}
`;
