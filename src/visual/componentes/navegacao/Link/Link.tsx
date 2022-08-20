import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import Router from "next/router";
import { Link as MuiLink, LinkProps as MuiLinkProps, ButtonProps } from "@mui/material";

export interface EloProps {
    children?: string | JSX.Element;
    href: string;
    mui?: MuiLinkProps | ButtonProps;
    next?: NextLinkProps;
    ComponenteReact?: React.ElementType; // "React.ElementType": componente React
    aoClicar?: () => void;
}

const Elo: React.FC<EloProps> = ({
    children,
    href,
    mui,
    next,
    ComponenteReact = MuiLink,
    ...outras
}) => {
    const ambienteNext = Boolean(Router.router);
    /* Se a propriedade "router" der indefinido, então quer dizer que não estaremos no
     * ambiente Next
     */
    return ambienteNext ? (
        <NextLink href={href} passHref {...next}>
            <ComponenteReact {...mui} {...outras}>
                {children}
            </ComponenteReact>
        </NextLink>
    ) : (
        <ComponenteReact href={href} {...mui} {...outras}>
            {children}
        </ComponenteReact>
    );
};

export default Elo;
