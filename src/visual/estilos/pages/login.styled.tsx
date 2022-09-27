import { styled, Paper, Button } from "@mui/material";

export const ContainerLogin = styled(Paper)`
	display: grid;
	grid-template-columns: minmax(200px, 650px);
	justify-content: center;
	padding: ${({ theme }) => theme.spacing(6) + " " + theme.spacing(2)};
	margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const BotaoLogin = styled(Button)`
	width: 226px;
	justify-self: center;
	margin-top: ${({ theme }) => theme.spacing(4)};
`;
