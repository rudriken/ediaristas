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

export const TPapel = styled(Paper)`
	padding: ${({ theme }) => "0" + theme.spacing(4)};
`;
export const TContainer = styled(TableContainer)``;

export const TTabela = styled(Table)`
	&.MuiTable-root {
		border-collapse: separate;
		border-spacing: 0 ${({ theme }) => theme.spacing(3)};
	}
`;
export const TCabecalho = styled(TableHead)`
	text-transform: uppercase;
	.MuitableCell-root {
		font-weight: bold;
	}
`;
export const TCorpo = styled(TableBody)`
	.MuiTableRow-root {
		background-color: ${({ theme }) => theme.palette.grey[100]};
	}
`;
export const TLinha = styled(TableRow)``;

export const TCelula = styled(TableCell)`
	&.MuiTableCell-root {
		border: none;
		padding: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(4)};
		color: ${({ theme }) => theme.palette.text.secondary};
	}
`;

export const TPaginacao = styled(Pagination)``;
