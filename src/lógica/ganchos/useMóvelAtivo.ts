import { useTheme, useMediaQuery } from "@mui/material";

export default function useMóvelAtivo(): boolean {
    const tema = useTheme(),
        móvelAtivo = useMediaQuery(tema.breakpoints.down("md"));
    return móvelAtivo;
}
