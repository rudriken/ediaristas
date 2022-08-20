import { styled, Select } from "@mui/material";
// import {  } from "@mui/material";
// import { SeletorProps } from "./Seletor";

export const SeletorEstilizado = styled(Select)`
	&.MuiInputBase-root {
		background-color: ${({ theme }) => theme.palette.grey[50]};
	}

	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ theme }) => theme.palette.grey[100]};
	}
`;
