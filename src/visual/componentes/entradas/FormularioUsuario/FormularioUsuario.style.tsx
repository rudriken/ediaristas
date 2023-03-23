import { styled, Container } from "@mui/material";
// import { FormularioUsuarioProps } from "./FormularioUsuario";

export const ContainerFormularioEstilizado = styled(Container)`
	${({ theme }) => theme.breakpoints.down("md")} {
		.MuiPaper-root {
			box-shadow: none;
		}
	}
`;

export const ContainerPaginaFormulario = styled("div", {
	shouldForwardProp: (propriedade) => propriedade !== "larguraTotal",
})<{
	larguraTotal?: boolean;
}>`
	display: grid;
	grid-template-columns: ${({ larguraTotal }) =>
		larguraTotal ? "1fr" : "minmax(652px, 1fr) minmax(150px, 318px)"};
	gap: ${({ theme }) => theme.spacing(6)};
	align-items: flex-start;
	margin-bottom: ${({ theme }) => theme.spacing(8)};

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-columns: 1fr;
		gap: ${({ theme }) => theme.spacing(3)};
		.MuiPaper-root {
			padding: 0;
		}
	}
`;

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

export const DadosUsuario = styled(GradeBase)`
	grid-template-columns: repeat(3, 1fr);
	grid-template-areas:
		"nome 				nome 	nome"
		"data-nascimento 	cpf 	telefone";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas:
			"nome"
			"data-nascimento"
			"cpf"
			"telefone";
	}
`;

export const DadosNovoContato = styled(GradeBase)`
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"email 				email"
		"senha 				senha-forca"
		"confirmar-senha 	senha-forca";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas:
			"email"
			"senha"
			"senha-forca"
			"confirmar-senha";
	}
`;

export const DadosContato = styled(GradeBase)`
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"email 				email"
		"senha-antiga 		senha-antiga"
		"nova-senha			confirmar-senha"
		"senha-forca		_";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas:
			"email"
			"senha-antiga"
			"senha-antiga"
			"nova-senha"
			"senha-forca"
			"confirmar-senha";
	}
`;

export const DadosPagamento = styled(GradeBase)`
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"numero 	numero"
		"nome 		nome"
		"validade 	codigo"
		"erro 		erro";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas:
			"numero"
			"nome"
			"validade"
			"codigo"
			"erro";
	}
`;

export const DadosEndereco = styled(GradeBase)`
	grid-template-columns: repeat(7, 1fr);
	grid-template-areas:
		"cep 		cep 	estado 		estado 		cidade 	cidade 			cidade"
		"bairro 	bairro 	logradouro 	logradouro 	numero 	complemento 	complemento";

	${({ theme }) => theme.breakpoints.down("md")} {
		grid-template-areas: "cep" "estado" "cidade" "bairro" "logradouro" "numero" "complemento";
	}
`;

export const DadoFinanceiro = styled(GradeBase)`
	grid-template-columns: 1fr;
`;

export const CidadesSelecao = styled(GradeBase)`
	grid-template-columns: 1fr;
	grid-template-areas: "busca-cidade";
`;
/* ( . . . ) */
export const ImagemSelecionada = styled(GradeBase)`
	grid-template-columns: 1fr;
	padding: 0;
`;

export const LoginDados = styled(GradeBase)`
	${({ theme }) => theme.breakpoints.down("md")} {
		text-align: right;
	}
	a {
		text-decoration: underline;
		color: ${({ theme }) => theme.palette.text.secondary};
	}
`;
