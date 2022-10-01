import { useEffect, useState } from "react";
import {
	Container,
	Toolbar,
	IconButton,
	MenuList,
	MenuItem,
	Divider,
} from "@mui/material";
import useMovelAtivo from "logica/ganchos/useMovelAtivo";
import BotaoArredondadoEstilizado from "visual/componentes/entradas/BotaoArredondado/BotaoArredondado";
import Elo from "visual/componentes/navegacao/Link/Link";
import {
	CabecalhoAppBar,
	CabecalhoLogo,
	CabecalhoBotoesContainer,
	CabecalhoGaveta,
} from "./Header.style";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import MenuCabecalhoDoUsuario from "visual/componentes/navegacao/MenuCabecalhoDoUsuario/MenuCabecalhoDoUsuario";
import PerfilDoUsuarioAvatar from "visual/componentes/exibe-dados/PerfilDoUsuarioAvatar/PerfilDoUsuarioAvatar";

export interface CabecalhoProps {
	usuario: InterfaceDoUsuario;
	aoDeslogar?: () => void;
}

const Cabecalho: React.FC<CabecalhoProps> = (propriedades) => {
	const movelAtivo = useMovelAtivo();
	return movelAtivo ? (
		<CabecalhoVersaoMovel {...propriedades} />
	) : (
		<CabecalhoVersaoDesktop {...propriedades} />
	);
};

const CabecalhoVersaoDesktop: React.FC<CabecalhoProps> = (propriedades) => {
	const [menuAberto, alterarMenuAberto] = useState(false),
		temUsuarioLogado = propriedades.usuario.nome_completo.length > 0,
		usuarioTipo = propriedades.usuario.tipo_usuario;

	useEffect(() => {
		if (!temUsuarioLogado) {
			alterarMenuAberto(false);
		}
	}, [temUsuarioLogado]);

	return (
		<CabecalhoAppBar>
			<Toolbar component={Container}>
				<Elo href={"/"}>
					<CabecalhoLogo
						src={"/imagens/logos/logo.svg"}
						alt={"e-diaristas"}
					/>
				</Elo>
				<CabecalhoBotoesContainer>
					{temUsuarioLogado && (
						<>
							{usuarioTipo === TipoDoUsuario.Diarista ? (
								<Elo
									href={"/oportunidades"}
									ComponenteReact={BotaoArredondadoEstilizado}
								>
									Oportunidades
								</Elo>
							) : (
								<Elo
									href={"/encontrar-diarista"}
									ComponenteReact={BotaoArredondadoEstilizado}
								>
									Encontrar Diarista
								</Elo>
							)}
							<Elo
								href={"/diarias"}
								ComponenteReact={BotaoArredondadoEstilizado}
							>
								Diárias
							</Elo>
							{usuarioTipo === TipoDoUsuario.Diarista && (
								<Elo
									href={"/pagamentos"}
									ComponenteReact={BotaoArredondadoEstilizado}
								>
									Pagamentos
								</Elo>
							)}
						</>
					)}
				</CabecalhoBotoesContainer>
				<div>&nbsp;</div>
				{temUsuarioLogado ? (
					<MenuCabecalhoDoUsuario
						usuario={propriedades.usuario}
						menuAberto={menuAberto}
						quandoClicar={() => alterarMenuAberto(true)}
						quandoMenuAberto={() => alterarMenuAberto(false)}
						quandoFecharMenu={() => alterarMenuAberto(false)}
						quandoClicarEmSair={propriedades.aoDeslogar}
					/>
				) : (
					<CabecalhoBotoesContainer>
						<Elo
							href={"/cadastro/diarista"}
							ComponenteReact={BotaoArredondadoEstilizado}
							mui={{ color: "primary", variant: "contained" }}
						>
							Seja um(a) diarista
						</Elo>
						<Elo
							href={"/login"}
							ComponenteReact={BotaoArredondadoEstilizado}
						>
							Login
						</Elo>
					</CabecalhoBotoesContainer>
				)}
			</Toolbar>
		</CabecalhoAppBar>
	);
};

const CabecalhoVersaoMovel: React.FC<CabecalhoProps> = (propriedades) => {
	const [gavetaAberta, alterarGavetaAberta] = useState(false),
		temUsuarioLogado = propriedades.usuario.nome_completo.length > 0,
		usuarioTipo = propriedades.usuario.tipo_usuario;
	return (
		<CabecalhoAppBar>
			<Toolbar component={Container}>
				<IconButton
					edge={"start"}
					color="inherit"
					onClick={() => alterarGavetaAberta(true)}
				>
					<i className={"twf-bars"} />
				</IconButton>
				<Elo href={"/"}>
					<CabecalhoLogo
						src={"/imagens/logos/logo.svg"}
						alt={"e-diaristas"}
					/>
				</Elo>
				<CabecalhoGaveta
					open={gavetaAberta}
					onClose={() => alterarGavetaAberta(false)}
					onClick={() => alterarGavetaAberta(false)}
				>
					{temUsuarioLogado ? (
						<>
							<PerfilDoUsuarioAvatar
								usuario={propriedades.usuario}
							/>
							<MenuList>
								{usuarioTipo === TipoDoUsuario.Diarista ? (
									<Elo
										href={"/oportunidades"}
										ComponenteReact={MenuItem}
									>
										Oportunidades
									</Elo>
								) : (
									<Elo
										href={"/encontrar-diarista"}
										ComponenteReact={MenuItem}
									>
										Encontrar Diarista
									</Elo>
								)}
								<Elo
									href={"/diarias"}
									ComponenteReact={MenuItem}
								>
									Diárias
								</Elo>
								{usuarioTipo === TipoDoUsuario.Diarista && (
									<Elo
										href={"/pagamentos"}
										ComponenteReact={MenuItem}
									>
										Pagamentos
									</Elo>
								)}
								<Divider />
								<Elo
									href={"/alterar-dados"}
									ComponenteReact={MenuItem}
								>
									Alterar Dados
								</Elo>
								<Elo
									href={""}
									ComponenteReact={MenuItem}
									onClick={propriedades.aoDeslogar}
								>
									Sair
								</Elo>
							</MenuList>
						</>
					) : (
						<MenuList>
							<Elo href={"/login"} ComponenteReact={MenuItem}>
								Login
							</Elo>
							<Divider />
							<Elo
								href={"/cadastro/diarista"}
								ComponenteReact={MenuItem}
							>
								Seja um(a) diarista
							</Elo>
						</MenuList>
					)}
				</CabecalhoGaveta>
			</Toolbar>
		</CabecalhoAppBar>
	);
};

export default Cabecalho;
