import { useTheme, useMediaQuery } from "@mui/material";

export default function useMovelAtivo(): boolean {
    const tema = useTheme(),
        movelAtivo = useMediaQuery(tema.breakpoints.down("md"));
    return movelAtivo;
}
