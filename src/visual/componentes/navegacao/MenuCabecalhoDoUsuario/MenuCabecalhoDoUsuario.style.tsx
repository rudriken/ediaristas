import { styled, Menu } from "@mui/material";
// import { MenuCabecalhoDoUsuarioProps } from "./MenuCabecalhoDoUsuario";

export const MenuCabecalhoDoUsuarioContainer = styled("div")`
	display: inline-block;
`;

export const MenuDoUsuario = styled(Menu)`
	.MuiMenu-paper {
		background-color: ${({ theme }) => theme.palette.primary.main};
		color: ${({ theme }) => theme.palette.primary.contrastText};
	}
	.MuiDivider-root {
		background-color: ${({ theme }) => theme.palette.primary.light};
		margin: ${({ theme }) => theme.spacing(1) + " " + theme.spacing(2)};
	}
	li {
		box-sizing: border-box;
		padding: ${({ theme }) => theme.spacing(1) + " " + theme.spacing(2)};
	}
`;
