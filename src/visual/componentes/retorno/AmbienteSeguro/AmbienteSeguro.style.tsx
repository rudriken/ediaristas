import { styled } from "@mui/material";

export const AmbienteSeguroContainer = styled("div")`
    color: ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.background.default};
    font-size: 12px;
    padding: ${({ theme }) => theme.spacing(2)} 0;
	text-align: right;
`;
