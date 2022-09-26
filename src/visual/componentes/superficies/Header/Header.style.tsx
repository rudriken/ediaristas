import { styled, AppBar, AppBarProps, Drawer } from "@mui/material";

export const CabecalhoAppBar = styled((propriedades: AppBarProps) => (
    <AppBar position={"sticky"} {...propriedades} />
))`
    &.MuiAppBar-root {
        background-color: ${(rodrigo) => rodrigo.theme.palette.background.paper};
        box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05);
        color: ${(rodrigo) => rodrigo.theme.palette.text.secondary};
    }

    .MuiToolbar-root {
        display: grid;
        grid-template-columns: 52px auto 52px;
        justify-content: space-between;
    }

    ${(divino) => divino.theme.breakpoints.up("md")} {
        .MuiToolbar-root {
            grid-template-columns: auto auto 1fr auto;
            gap: ${(denise) => denise.theme.spacing(9)};
            height: 100px;
        }
    }
`;

export const CabecalhoLogo = styled("img")`
    height: 25px;

    ${(isabelly) => isabelly.theme.breakpoints.up("md")} {
        height: 47px;
    }
`;

export const CabecalhoBotoesContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: ${(nair) => nair.theme.spacing(2)};
`;

export const CabecalhoGaveta = styled(Drawer)`
    .MuiPaper-root {
        padding: ${(cláudio) => cláudio.theme.spacing()};
        background-color: ${(luiz) => luiz.theme.palette.primary.main};
        color: ${(claudemiro) => claudemiro.theme.palette.primary.contrastText};
    }

    .MuiDivider-root {
        margin: ${(pedro) => pedro.theme.spacing(2)};
        border-color: ${(antônio) => antônio.theme.palette.primary.light};
    }
`;
