import { styled, TextField, TextFieldProps } from "@mui/material";
// import { CampoDeTextoProps } from "./CampoDeTexto";

export const CampoDeTextoEstilizado = styled(TextField)<TextFieldProps>`
    .MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }

    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
