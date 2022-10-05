import {
	styled,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
	Paper,
} from "@mui/material";
// import { TabelaProps } from "./Tabela";

export const PapelTabela = styled(Paper)`
	padding: ${({ theme }) => "0" + theme.spacing(4)};
`;
export const ContainerTabela = styled(TableContainer)``;
export const TabelaE = styled(Table)`
	&.MuiTable-root {
		border-collapse: separate;
		border-spacing: 0 ${({ theme }) => theme.spacing(3)};
	}
`;
export const CabecalhoTabela = styled(TableHead)`
	text-transform: uppercase;
	.MuitableCell-root {
		font-weight: bold;
	}
`;
export const CorpoTabela = styled(TableBody)`
	.MuiTableRow-root {
		background-color: ${({ theme }) => theme.palette.grey[100]};
	}
`;
export const LinhaTabela = styled(TableRow)``;
export const CelulaTabela = styled(TableCell)`
	&.MuiTableCell-root {
		border: none;
		padding: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(4)};
		color: ${({ theme }) => theme.palette.text.secondary};
	}
`;
export const PaginacaoTabela = styled(Pagination)``;
