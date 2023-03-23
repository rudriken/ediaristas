import { styled, ToggleButtonGroup, ToggleButton } from "@mui/material";
// import { GrupoAlternadorDeBotaoProps } from "./GrupoAlternadorDeBotao";

export const GrupoAlternadorDeBotaoEstilizado = styled(ToggleButtonGroup)`
	&.MuiToggleButtonGroup-root {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: ${({ theme }) => theme.spacing(2)};
	}
`;

export const AlternadorDeBotaoEstilizado = styled(ToggleButton)`
	&.MuiToggleButton-root.MuiToggleButtonGroup-groupedHorizontal {
		border-radius: 3px;
		border: 2px solid ${({ theme }) => theme.palette.grey[100]};
		background-color: ${({ theme }) => theme.palette.grey[50]};
		text-transform: none;
		&.Mui-selected {
			background-color: ${({ theme }) => theme.palette.secondary.main};
			color: white;
			border: 2px solid ${({ theme }) => theme.palette.secondary.dark};
			&:hover {
				background-color: ${({ theme }) =>
					theme.palette.secondary.dark};
			}
		}
	}

	&.MuiToggleButton-root {
		display: grid;
		${({ theme }) => theme.breakpoints.up("md")} {
			gap: ${({ theme }) => theme.spacing()};
			grid-auto-flow: column;
		}
	}

	i {
		font-size: 25px;
	}
`;
