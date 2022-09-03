import { styled } from "@mui/material";
// import {  } from "@mui/material";

export const ContainerItens = styled("div")`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: ${({ theme }) => theme.spacing(3)};
`;
