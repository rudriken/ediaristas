import { Divider } from "@mui/material";
import { InterfaceDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import React, { useRef } from "react";
import PerfilDoUsuarioAvatar from "visual/componentes/exibe-dados/PerfilDoUsuarioAvatar/PerfilDoUsuarioAvatar";
import Elo from "../Link/Link";
// import {  } from "@mui/material";
import {
	MenuCabecalhoDoUsuarioContainer,
	MenuDoUsuario,
} from "./MenuCabecalhoDoUsuario.style";

export interface MenuCabecalhoDoUsuarioProps {
	usuario: InterfaceDoUsuario;
	menuAberto: boolean;
	quandoClicar?: (evento: React.MouseEvent) => void;
	quandoMenuAberto?: (evento: React.MouseEvent) => void;
	quandoFecharMenu?: (evento: React.MouseEvent) => void;
	quandoClicarEmSair?: () => void;
}

const MenuCabecalhoDoUsuario: React.FC<MenuCabecalhoDoUsuarioProps> = (
	propriedades
) => {
	const containerRef = useRef(null);
	return (
		<MenuCabecalhoDoUsuarioContainer ref={containerRef}>
			<PerfilDoUsuarioAvatar
				usuario={propriedades.usuario}
				aoClicar={propriedades.quandoClicar}
			/>
			<MenuDoUsuario
				open={propriedades.menuAberto}
				anchorEl={containerRef.current}
				onClose={propriedades.quandoFecharMenu}
				onClick={propriedades.quandoMenuAberto}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<li>
					<Elo href={"/alterar-dados"} mui={{ color: "inherit" }}>
						Alterar Dados
					</Elo>
				</li>
				<Divider />
				<li>
					<Elo
						href={""}
						aoClicar={propriedades.quandoClicarEmSair}
						mui={{ color: "inherit" }}
					>
						Sair
					</Elo>
				</li>
			</MenuDoUsuario>
		</MenuCabecalhoDoUsuarioContainer>
	);
};

export default MenuCabecalhoDoUsuario;
