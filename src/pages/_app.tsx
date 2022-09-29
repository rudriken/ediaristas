import { useContext, useEffect } from "react";
import "@estilos/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import temaOficial from "visual/temas/temas";
import Cabecalho from "visual/componentes/superficies/Header/Header";
import Rodape from "visual/componentes/superficies/Footer/Footer";
import { AppContainer } from "@estilos/pages/_app.styled";
import { ProvedorPrincipal } from "logica/contextos/ContextoPrincipal";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import useRoteadorProtetor, {
	rotasPrivadas,
} from "logica/ganchos/useRoteadorProtetor.hook";

function App({ Component, pageProps }: AppProps) {
	const { estadoUsuario } = useContext(ContextoUsuario);
	const roteador = useRoteadorProtetor(
		estadoUsuario.usuario,
		estadoUsuario.logando
	);

	useEffect(() => {
		document.querySelector("#jss-server-side")?.remove();
	}, []);

	function podemosExibir(): boolean {
		if (rotasPrivadas.includes(roteador.pathname)) {
			if (estadoUsuario.logando) {
				return false;
			} else {
				return estadoUsuario.usuario.nome_completo.length > 0;
			}
		}
		return true;
	}

	return (
		<>
			<Head>
				<title>
					e-diaristas {pageProps.titulo && ` - ${pageProps.titulo}`}
				</title>
			</Head>
			<ThemeProvider theme={temaOficial}>
				<AppContainer>
					<Cabecalho />
					<main>
						{podemosExibir() ? (
							<Component {...pageProps} />
						) : (
							<Container sx={{ textAlign: "center", my: 10 }}>
								<CircularProgress />
							</Container>
						)}
					</main>
					<Rodape />
				</AppContainer>
			</ThemeProvider>
		</>
	);
}

const ContainerAppProvedor: React.FC<AppProps> = (propriedades) => {
	return (
		<ProvedorPrincipal>
			<App {...propriedades} />
		</ProvedorPrincipal>
	);
};

export default ContainerAppProvedor;
