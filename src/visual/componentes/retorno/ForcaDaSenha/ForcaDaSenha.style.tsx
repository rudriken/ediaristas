import { styled, LinearProgress, Theme } from "@mui/material";
// import {  } from "@mui/material";
// import { ForcaDaSenhaProps } from "./ForcaDaSenha";

export const ForcaDaSenhaRotulo = styled("span", {
	shouldForwardProp: (propriedades) => propriedades !== "value",
})<{ value: number }>`
	font-weight: bold;
	color: ${({ theme, value }) => tratarCorBarra(theme, value)};
`;

export const ForcaDaSenhaBarra = styled(LinearProgress)`
	margin-top: ${({ theme }) => theme.spacing()};

	.MuiLinearProgress-bar {
		background-color: ${({ theme, value }) => tratarCorBarra(theme, value)};
	}

	&.MuiLinearProgress-root {
		background-color: ${({ theme }) => theme.palette.grey[200]};
	}
`;

function tratarCorBarra(tema: Theme, valor = 0) {
	if (valor <= 25) {
		return tema.palette.error.main;
	}
	if (valor > 25 && valor <= 50) {
		return tema.palette.warning.main;
	}
	return tema.palette.success.main;
}
