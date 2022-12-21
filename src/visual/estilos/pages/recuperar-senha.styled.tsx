import { styled } from "@mui/material";

export const ContainerCamposDoFormulario = styled("div")`
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 100%;
	max-width: 500px;
	margin: ${({ theme }) => "0 auto " + theme.spacing(8)};
`;
