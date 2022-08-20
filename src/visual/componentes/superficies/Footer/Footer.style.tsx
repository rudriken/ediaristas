import React, { ElementType } from "react";
import {
    styled,
    Typography,
    TypographyProps,
    List,
    ListItem,
    ListItemProps,
    Link,
    LinkProps,
    IconButton,
    Container,
} from "@mui/material";

export const RodapeContainer = styled("footer")`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    padding: ${({ theme }) => theme.spacing(4)} 0;
    margin-top: auto;
`;

export const RodapeTitulo = styled((propriedades: TypographyProps<React.ElementType>) => (
    <Typography variant={"body2"} component={"h2"} {...propriedades} />
))`
    font-weight: bold;
`;

export const RodapeListaItem = styled((propriedades: ListItemProps) => (
    <ListItem disableGutters {...propriedades} />
))``;

export const RodapeAplicativosERedesSociais = styled("div")`
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.breakpoints.down("md")} {
        width: 100%;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    ${({ theme }) => theme.breakpoints.down(726)} {
        flex-direction: column;
    }
`;

export const Aplicativos = styled("ul")`
    display: flex;
    gap: ${({ theme }) => theme.spacing()};
    list-style-type: none;
    padding: 0;
    margin: ${({ theme }) => theme.spacing(2) + " 0 " + theme.spacing(3)};

    img {
        width: 112px;
    }
`;

export const RedesSociais = styled(List)`
    display: grid;
    grid-template-columns: repeat(3, 58px);
    grid-gap: ${({ theme }) => theme.spacing(1.5)};
`;
/* ( . . . ) */
export const BotaoRedeSocial = styled((propriedades: LinkProps<React.ElementType>) => (
    <Link
        component={IconButton}
        target={"_blank"}
        rel={"noopener noreferrer"}
        {...propriedades}
    />
))`
    background-color: ${({ theme }) => theme.palette.primary.dark};
    i {
        color: ${({ theme }) => theme.palette.primary.contrastText};
    }
`;
/* ( . . . ) */
export const RodapeSubContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
`;
